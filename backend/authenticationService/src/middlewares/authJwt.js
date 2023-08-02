const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

getAllAuthenInfo = async (req, res, next) => {
    console.log(req.userId);
    let user = await User.findByPk(req.userId);
    if (!user) {
        return res.status(404).send({
            message: "Can't verify this user in system"
        });
    }

    let roles = await user.getRoles();
    let userRoles = [];
    for (let role of roles) {
        userRoles.push(role.name);
    }

    req.userId = user.id;
    req.authenedRoles = userRoles;
    next();
};

isAdmin = (req, res, next) => {
    console.log("request user id = " + req.userId);
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

getAuthInfoFromGateway = (req, res, next) => {
    let infoHeader = req.headers["x-authen-info"];

    if (!infoHeader) {
        res.status(404).send({
            message: "Unauthized"
        })
    }

    let info = JSON.parse(JSON.parse(infoHeader));
    req.userId = info.userId;
    req.authenedRoles = info.authenedRoles;
    next();
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    getAllAuthenInfo: getAllAuthenInfo,
    getAuthInfoFromGateway : getAuthInfoFromGateway
};
module.exports = authJwt;