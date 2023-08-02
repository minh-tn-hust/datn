module.exports = (sequelize, Sequelize) => {
    const LanguageSupport = sequelize.define("languageSupport", {
        type: {
            type: Sequelize.TEXT
        },
        memoryLimited: {
            type: Sequelize.INTEGER
        },
        timeLimited: {
            type: Sequelize.INTEGER
        }
    });
    return LanguageSupport;
};
