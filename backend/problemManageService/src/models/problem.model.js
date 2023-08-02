module.exports = (sequelize, Sequelize) => {
    const Problem = sequelize.define("problem", {
        problemName: {
            type: Sequelize.TEXT
        },
        hardLevel : {
            type: Sequelize.ENUM,
            values: ["easy", "medium", "hard"]
        },
        description: {
            type: Sequelize.TEXT
        },
        statement: {
            type: Sequelize.TEXT
        },
        input: {
            type: Sequelize.TEXT
        },
        output: {
            type: Sequelize.TEXT
        },
        constraint: {
            type: Sequelize.TEXT
        },
        ownerId : {
            type : Sequelize.INTEGER
        }
    });

    return Problem;
};
