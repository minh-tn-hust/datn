const { verifySignUp, authJwt, verifyRoleIntergrate } = require("../middlewares");
const controller = require("../controllers/auth/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signUp
  );

  app.post(
    "/api/auth/addMember",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      authJwt.getAuthInfoFromGateway,
      authJwt.isAdmin,
    ],
    controller.signUpForAdmin
  );

  app.get(
    "/api/auth/inspectator",
    [
      authJwt.verifyToken, 
      authJwt.getAllAuthenInfo
    ],
    controller.inspectatorUser
  );


  app.get(
    "/api/auth/allUser",
    [
      authJwt.getAuthInfoFromGateway,
      authJwt.isAdmin
    ],
    controller.getAllUser
  );

  app.post("/api/auth/signin", controller.signIn);

  app.post(
    "/api/auth/removeRole", 
    [
      authJwt.getAuthInfoFromGateway,
      authJwt.isAdmin,
      verifyRoleIntergrate.checkRoleInputData
    ],
    controller.removeRole
  );

  app.post(
    "/api/auth/addRole", 
    [
      authJwt.getAuthInfoFromGateway,
      authJwt.isAdmin,
      verifyRoleIntergrate.checkRoleInputData
    ],
    controller.addRole
  );
  
  app.get(
    "/api/auth/verifyToken",
    [
      authJwt.verifyToken, 
      authJwt.getAllAuthenInfo
    ],
    controller.verifyToken
  )

  app.get("/api/user/:id", controller.getUserInfo);
};
