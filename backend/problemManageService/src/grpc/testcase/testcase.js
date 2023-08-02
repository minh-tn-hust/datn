const db = require('../../models');

const Testcase = db.testcase;

exports.getTestcaseWithProblem = async (call, callback) => {
  const {
    problemId
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
    let response = {
      status : true,
      message : null,
      inps : listInp,
      outs : listOut 
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