const config = require("../configs/db.config")

// Config Sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        port : config.PORT,
        dialect : config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

// End config sequelize

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.submission = require('./submission.model')(sequelize, Sequelize);

module.exports = db;
