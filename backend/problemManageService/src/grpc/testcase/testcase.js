const db = require('../../models');

const Testcase = db.testcase;

exports.getTestcaseWithProblem = async (call, callback) => {
  const {
    problemId,
  } = call.request;

  let listTestcase;
  try {
    listTestcase = await Testcase.findAll({
      where: {
        problemId: problemId,
      },
    });

    const listInp = [];
    const listOut = [];

    for (const testCase of listTestcase) {
      listInp.push(testCase.dataValues.input);
      listOut.push(testCase.dataValues.output);
    }

    const response = {
      status: true,
      message: null,
      inps: listInp,
      outs: listOut,
    };

    callback(null, response);
  } catch (error) {
    const response = {
      status: false,
      message: error,
      inps: null,
      outs: null,
    };
    callback(null, response);
  }
};
