require('dotenv').config()

const workerConfig = {
    maxWoker : process.env.MAX_PARALLEL_CONTAINER
}

module.exports = workerConfig;