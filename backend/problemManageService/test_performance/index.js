const fs = require('fs');
const db = require('../src/models');
const { LANGUAGE_SUPPORT } = require('../src/configs/problem.config');

const Problem = db.problem;
const Testcase = db.testcase;
const LanguageSupport = db.languageSupport;



const readFileWithFileName = async function (filePath) {
    return new Promise(async (resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            resolve(data);
        });
    })
}

let inputFolder = "./test_performance/input/"
let outputFolder = "./test_performance/output/"


const createTestCase = async (problemModel) => {
    let testcase = [
        "00.txt",
        "01.txt",
        "02.txt",
        "03.txt",
        "04.txt",
    ]

    for (let i = 0; i < testcase.length; i++) {
        let inputFilePath = inputFolder + testcase[i];
        let outputFilePath = outputFolder + testcase[i];

        let inputData = await readFileWithFileName(inputFilePath);
        let outputData = await readFileWithFileName(outputFilePath);

        let data = {
            input: inputData,
            output: outputData,
            explaination: "",
            problemId: problemModel.dataValues.id,
        }


        const testcaseModel = await Testcase.create(data);
        await problemModel.addTestcase(testcaseModel);
    }
}

const createTestPerformanceProblem = async () => {
    let problemData = {
      problemName: "Test Performance",
      hardLevel: "hard",
      description: "Test Performance Description",
      statement: "Test Performance Statement",
      input: "Test Performance Input",
      output: "Test Performance Output",
      constraint: "Test Performance Constraint",
      ownerId: 1,
    };
    
    let problem = await Problem.create(problemData);
    createTestCase(problem);


    for (let languageType of Object.values(LANGUAGE_SUPPORT)) {
      const language = await LanguageSupport.create({
        type: languageType,
        timeLimited: 2,
        memoryLimited: 128
      });
      problem.addLanguageSupport(language);
    }
}

module.exports = createTestPerformanceProblem;