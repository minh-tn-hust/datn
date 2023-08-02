module.exports = (sequelize, Sequelize) => {
  const Submission = sequelize.define("submission", {
    ownerId: {
      type: Sequelize.INTEGER,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    problemId: {
      type: Sequelize.INTEGER,
    },
    source: {
      type: Sequelize.TEXT('long')
    },
    status: {
      type: Sequelize.TEXT('long')
    },
    numberTestcasePass: {
      type: Sequelize.INTEGER
    },
    numberTestcase : {
      type: Sequelize.INTEGER
    },
    points: {
      type: Sequelize.INTEGER
    },
    error: {
      type: Sequelize.TEXT
    },
    language: {
      type: Sequelize.STRING
    },
    timeExecute : {
      type : Sequelize.INTEGER
    },
    memoryUsage : {
      type : Sequelize.INTEGER
    }
  });

  return Submission;
};