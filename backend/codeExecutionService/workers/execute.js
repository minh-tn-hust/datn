const { parentPort, workerData } = require('worker_threads');
const Language = require('../docker/language/LanguageFactory');
const LanguageContainer = require('../docker/executable');
const { WorkerJob, WorkerSend, WorkerReponse } = require('./job');
const { defaultMaxListeners } = require('events');
const client = require('../grpc/index');

let /** @type LanguageContainer */ dockerContainer;
let /** @type Array<String> */ inps;
let /** @type Array<String> */ outs;

const EXECUTE_CODE_STATUS = {
  AC: "AC",
  TLE: "TLE",
  WA: "WA",
  RE: "RE",
  MLE: "MLE",
  CE : "CE",
  CAN_CHECK_ANSWER: "CAN_CHECK_ANSWER",
};

function createWorkerResponse(type) {
  if (dockerContainer) {
    return new WorkerReponse(type, dockerContainer.id, null);
  } else {
    return new WorkerReponse(type, -1, null);
  }
}

async function createContainer(wokerData) {
  // console.log("STEP 1: Create Container")
  const /** @type Language.SUPPORTED */ languageType = wokerData.languageType;
  const timeLimited = wokerData.timeLimited;
  const executionPath = workerData.workingDirectory;
  const language = Language.create(languageType, executionPath);
  language.setMemoryLimted(wokerData.memoryLimited);
  language.setLanguageConfig();

  try {
    dockerContainer = new LanguageContainer(language, timeLimited);
  } catch (error) {
    let response = createWorkerResponse(WorkerJob.TYPE.STARTING);
    console.log(error)
    response.data = error;
    return;
  }

  let response = createWorkerResponse(WorkerJob.TYPE.STARTING);
  try {
    await dockerContainer.initContainer();
    response.data = true;
  } catch (error) {
    response.data = error;
  }

  parentPort.postMessage(response);
}

/**
 * @param {WorkerSend} message 
 */
function handleSendMessage(message) {
  switch (message.type) {
    case WorkerJob.TYPE.UPDATE_TIME_LIMITED:
      updateTimeLimited(message.data);
      break;
    case WorkerJob.TYPE.CREATE_FILE:
      createFile(message.data)
      break;

    case WorkerJob.TYPE.EXECUTING:
      runCodeWithoutSaving(message.data);
      break;

    case WorkerJob.TYPE.STOP_AND_REMOVE:
      stopAndRemove();
      break;

    case WorkerJob.TYPE.RECREATE_CONTAINER:
      createContainer(message.data);
      break;

    case WorkerJob.TYPE.EXECUTING_SA:
      runCodeWithSaving(message.data);
      break;

    default:
      console.log("Unknow type: " + message.type);
  }
}

/**
 * @param {{buffer : string, fileName : string}} data 
 */
async function createFile(data) {
  // console.log("STEP 2: Create Source file")
  let response = createWorkerResponse(WorkerJob.TYPE.CREATE_FILE);
  try {
    await dockerContainer.createFileWithBuffer(data.buffer, data.fileName);
    updateFileName(data.fileName);
    response.data = true;
  } catch (error) {
    response.data = error;
  }
  parentPort.postMessage(response);
}

function updateFileName(fileName) {
  let language = dockerContainer.language;
  language.updateFilename(fileName);
}

function checkOutput(stdout, output) {
  if(stdout.length === 0) {
    return false;
  }

  for (let i = 0; i < stdout.length; i++) {
    if (stdout[i] !== output[i]) {
      return false;
    }
  }
  return true;
}

function convertToStatus(runInfo) {
    if (runInfo.timeExecute == -1) {
      return EXECUTE_CODE_STATUS.TLE;
    }

    if (runInfo.exitCode == 137) {
      return EXECUTE_CODE_STATUS.MLE;
    }

    if (runInfo.exitCode !== 0) {
      return EXECUTE_CODE_STATUS.RE;
    }

    return EXECUTE_CODE_STATUS.CAN_CHECK_ANSWER;

}

async function runCodeWithSaving(data) {
  // console.log("STEP 3: Compile && Run code")
  let response = createWorkerResponse(WorkerJob.TYPE.EXECUTING);
  try {
    await getTestCase(data.problemId);

    let startCompile = Date.now();
    await dockerContainer.compile();

    let listTestInfo = [];
    if (inps.length === 0) {
      response.data = {
        status: false,
        runInfo: "This problem has no test, please try later"
      };
      parentPort.postMessage(response);
      return;
    }

    for (let index in inps) {
      try {
        let runInfo = await dockerContainer.run(inps[index], outs[index]);

        let runStatus = convertToStatus(runInfo);
        if (runStatus === EXECUTE_CODE_STATUS.CAN_CHECK_ANSWER) {
          if (checkOutput(runInfo.stdout, runInfo.output)) {
            runStatus = EXECUTE_CODE_STATUS.AC;
          } else {
            runStatus = EXECUTE_CODE_STATUS.WA;
          }
        }

        runInfo.status = runStatus;

        // Chỉ chạy tiếp khi mà test case được AC, nếu khác AC
        // Trả về testcase bị lỗi và break, không chạy testcase khác
        listTestInfo.push(runInfo);
        await dockerContainer.handleFinishCompile(); // restart container to check memory
        if (runInfo.status !== EXECUTE_CODE_STATUS.AC) {
          break;
        }
        await dockerContainer.handleFinishCompile(); // restart container to check memory
      } catch (error) {
        throw error;
      }
    }

    let isPassAllTestCase = true;
    let maxUsageMemory = -1;
    let maxUsageTime = -1;
    for (let testCase of listTestInfo) {
      if (testCase.status === EXECUTE_CODE_STATUS.AC) {
        continue;
      } else {
        isPassAllTestCase = false;

      }
    }

    if (isPassAllTestCase) {
      for (let testCase of listTestInfo) {
        maxUsageMemory = Math.max(testCase.totalUsageMemory, maxUsageMemory);
        maxUsageTime = Math.max(testCase.timeExecute, maxUsageTime);
      }
      listTestInfo = [];
      listTestInfo.push({
        status : EXECUTE_CODE_STATUS.AC,
        numberTestcasePass : inps.length,
        numberTestcase : inps.length,
        timeExecute : maxUsageTime,
        memoryUsage : maxUsageMemory,
      })
    } else {
      // Chỉ lấy ra test case bị sai
      listTestInfo.splice(0, listTestInfo.length - 1);
    }

    response.data = {
      status: true,
      runInfo: listTestInfo
    };
  } catch (error) {
    response.data = {
      status: false,
      runInfo: error
    };
  }
  parentPort.postMessage(response);
}

async function runCodeWithoutSaving(data) {
  // console.log("STEP 3: Compile && Run code")
  let response = createWorkerResponse(WorkerJob.TYPE.EXECUTING);
  try {
    await getTestCase(data.problemId);

    let startCompile = Date.now();
    await dockerContainer.compile();
    console.log("Complie in : " + (Date.now() - startCompile));

    let listTestInfo = [];
    for (let index in inps) {
      try {
        let runInfo = await dockerContainer.run(inps[index], outs[index]);

        let runStatus = convertToStatus(runInfo);
        if (runStatus === EXECUTE_CODE_STATUS.CAN_CHECK_ANSWER) {
          if (checkOutput(runInfo.stdout, runInfo.output)) {
            runStatus = EXECUTE_CODE_STATUS.AC;
          } else {
            runStatus = EXECUTE_CODE_STATUS.WA;
          }
        }

        runInfo.status = runStatus;
        listTestInfo.push(runInfo);
        await dockerContainer.handleFinishCompile(); // restart container to check memory
      } catch (error) {
        throw error;
      }
    }
    response.data = {
      status: true,
      runInfo: listTestInfo
    };
  } catch (error) {
    response.data = {
      status: false,
      runInfo: error
    };
  }
  parentPort.postMessage(response);
}

async function stopAndRemove() {
  let response = createWorkerResponse(WorkerJob.TYPE.STOP_AND_REMOVE);
  try {
    await dockerContainer.stopAndRemoveContainer();
    response.data = true;
  } catch (error) {
    response.data = error;
  }

  parentPort.postMessage(response);
}

/**
 * @param {{timeLimited : number}}
 */
function updateTimeLimited(data) {
  dockerContainer.updateTimelimited(data.timeLimited);
}

async function getTestCase(problemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await new Promise((resolve, reject) => {
        client.getTestCase({ problemId: problemId }, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data)
          }
        });
      });

      inps = result.inps;
      outs = result.outs;
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

parentPort.on('message', async function (/** @type WorkerSend */ data) {
  handleSendMessage(data);
})

createContainer(workerData);
