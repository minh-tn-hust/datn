/* eslint-disable max-len */
const config = require('../configs/db.config');

// Config Sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      port: config.PORT,
      dialect: config.dialect,
      operatorsAliases: false,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    },
);

// End config sequelize

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Config relationship between table
db.problem = require('./problem.model')(sequelize, Sequelize);
db.testcase = require('./testcase.model')(sequelize, Sequelize);
db.category = require('./category.model')(sequelize, Sequelize);
db.languageSupport = require('./languageSupport.model')(sequelize, Sequelize);

// 1 category ~ n problem
db.category.belongsToMany(db.problem, {
  through: 'problem_categories',
  foreignKey: 'categoryId',
  otherKey: 'problemId',
});

// 1 problem ~ n category
db.problem.belongsToMany(db.category, {
  through: 'problem_categories',
  foreignKey: 'problemId',
  otherKey: 'categoryId',
});

// 1 problem ~ n test case
db.problem.hasMany(db.testcase, {
  foreignKey: 'problemId',
});

// 1 problem ~ n language support
db.problem.hasMany(db.languageSupport, {
  foreignKey: 'problemId',
});

module.exports = db;
