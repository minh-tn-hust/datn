module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        type: {
            type: Sequelize.TEXT
        },
        ownerId : {
            type : Sequelize.INTEGER
        }
    });

    return Category;
};
