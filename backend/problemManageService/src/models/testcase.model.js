module.exports = (sequelize, Sequelize) => {
  const Testcase = sequelize.define("testcase", {
    explaination: {
      type: Sequelize.TEXT,
    },
    isExample: {
      type: Sequelize.BOOLEAN,
    },
    input: {
      type: Sequelize.TEXT('long'),
    },
    output: {
      type: Sequelize.TEXT('long'),
    },
    ownerId: {
      type: Sequelize.INTEGER,
    },
    problemId : {
      type : Sequelize.INTEGER
    }
  });

  return Testcase;
};
