const db = require('../../models');

const Testcase = db.testcase;
const LanguageSupport = db.languageSupport;

exports.getTestcaseWithProblem = async (call, callback) => {
  const {
    problemId,
    type
  } = call.request;

  let listTestcase;
  try {
    listTestcase = await Testcase.findAll({
      where: {
        problemId: problemId
      }
    })


    let listInp = [];
    let listOut = [];

    for (let testCase of listTestcase) {
      listInp.push(testCase.dataValues.input);
      listOut.push(testCase.dataValues.output);
    }

    let languageSupport = await LanguageSupport.findOne({
      where : {
        problemId : problemId,
        type : type
      }
    });

    let response = {
      status : true,
      message : null,
      inps : listInp,
      outs : listOut,
      memory : languageSupport.memoryLimited,
      time : languageSupport.timeLimited
    }

    callback(null, response);

  } catch (error) {
    let response = {
      status : false,
      message : error,
      inps : null,
      outs : null
    }
    callback(null, response);
  }
}