const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkRoleInputData = (req, res, next) => {
    let listRole = ROLES;
    let requestedRole = req.body.role;
    if (listRole.indexOf(requestedRole) === -1) {
        res.status(500).send({message : `Quyền ${requestedRole} không tồn tại trong hệ thống`})
        return;
    }
    next();
};

const verifyRoleIntergrate = {
    checkRoleInputData : checkRoleInputData
};

module.exports = verifyRoleIntergrate;
