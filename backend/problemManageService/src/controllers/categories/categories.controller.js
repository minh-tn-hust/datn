const db = require("../../models");

const Categories = db.category;
const Problems = db.problem;

exports.addCategory = async (req, res) => {
    let categoryType = req.body.categoryType;
    let ownerId = req.body.owner;

    let category = await Categories.create({
        type : categoryType,
        ownerId : ownerId
    });
};
