const db = require("../../models");
const config = require("../../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User trên không tồn tại trong hệ thống" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Sai mật khẩu",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signUpForAdmin = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Đăng kí thành công" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: "Đăng kí thành công!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.inspectatorUser = (req, res) => {
  let userId = req.userId;
  let requestRoles = req.authenedRoles;
  res.status(200).send({
    userId: userId,
    authenedRoles: requestRoles,
  });
};

exports.getUserInfo = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `User với ${id} không tồn tại` });
    }

    res.status(200).send({ username: user.username, id: user.id });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Có lỗi xảy ra trong quá trình truy vấn user",
    });
  }
};

exports.getAllUser = async (req, res) => {
  let listUser = await User.findAll();

  let listResponse = [];
  for (let user of listUser) {

    let responseRoles = [];
    let userRoles = await user.getRoles();
    for (let role of userRoles) {
      responseRoles.push(role.dataValues.name);
    }

    listResponse.push({
      userName : user.username,
      email : user.email,
      roles : responseRoles,
      id : user.id
    });
  }

  res.status(200).send(listResponse);
};

exports.removeRole = async (req, res) => {
  let userId = req.body.userId;
  let removedRole =  req.body.role;

  let user = await User.findOne({
    where : {id : userId}
  });

  if (!user) {
    res.status(404).send({messgae : "Người dùng này không tồn tại trong hệ thống"});
  }

  let roles = await user.getRoles();
  let hasRole = false;
  for (let role of roles) {
    if (role.dataValues.id === db.roleToId(removedRole)) {
      hasRole = true;
    }
  }

  if (hasRole) {
    try {
      await user.removeRoles([db.roleToId(removedRole)]);
      res.status(200).send({
        message : `Cập nhật quyền thành công`,
        userId : userId,
        role : role
      });
    } catch (error) {
      res.status(500).send({message : `Không thể thực hiện xóa quyền này khỏi người dùng ${user.dataValues.username}`})
    }
  } else {
    res.status(500).send({message : `Người dùng ${user.username} không có quyền ${removedRole}, không thể xóa quyền.` })
  }
};


exports.addRole = async (req, res) => {
  let userId = req.body.userId;
  let addedRole =  req.body.role;

  let user = await User.findOne({
    where : {id : userId}
  });

  if (!user) {
    res.status(404).send({messgae : "Người dùng này không tồn tại trong hệ thống"});
    return;
  }

  let roles = await user.getRoles();
  let hasRole = false;
  for (let role of roles) {
    if (role.dataValues.id === db.roleToId(addedRole)) {
      hasRole = true;
    }
  }

  if (hasRole) {
    res.status(500).send({message : `Người dùng ${user.username} đã có quyền ${addedRole}, không thể thực hiện thêm.`})
    return;
  } else {
    try {
      await user.addRoles([db.roleToId(addedRole)]);
      res.status(200).send({
        message : `Cập nhật quyền thành công`,
        userId : userId,
        role : addedRole
      });
    } catch (error) {
      res.status(500).send({
        message : `Không thể thực hiện thêm quyền ${addedRole} cho người dùng ${user.dataValues.username}`,
        error : error
      })
    }
  }
};