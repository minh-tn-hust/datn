const controller = require("../controllers/problems/problems.controller");
const middleware = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/problem/create",
    middleware.auth.getAuthInfoFromGateway,
    middleware.auth.isAdminOrMod,
    middleware.problem.checkNullFields,
    controller.addProblem
  );

  app.post(
    "/api/problem/edit",
    middleware.auth.getAuthInfoFromGateway,
    middleware.auth.isAdminOrMod,
    middleware.problem.checkNullFields,
    controller.editProblem
  );

  app.get(
    "/api/problem/get",
    middleware.auth.getAuthInfoFromGateway,
    middleware.auth.isAdminOrMod,
    controller.getProblem
  );

  app.delete(
    "/api/problem/deleteAProblem/:id",
    middleware.auth.getAuthInfoFromGateway,
    middleware.auth.isAdminOrMod,
    controller.deleteAProblem
  );

  app.get("/api/problem/getAllProblems", controller.getAllProblem);

  app.get("/api/problem/getProblem", controller.getProblemByFilter);

  app.get("/api/problem/getAProblem/:id", controller.getAProblem);

  app.post(
    "/api/problem/addLanguage",
    middleware.auth.getAuthInfoFromGateway,
    middleware.auth.isAdminOrMod,
    controller.addLanguage
  );
};
