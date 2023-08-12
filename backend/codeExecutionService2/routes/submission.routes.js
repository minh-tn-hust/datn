const controller = require("../controlers/submission/submission.controller");
const { auth, submission } = require("../middlewares/index");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/something", auth.getAuthInfoFromGateway, controller.initServer);

  app.post(
    "/runWithoutSaving",
    auth.getAuthInfoFromGateway,
    submission.checkNullField,
    controller.runWithoutStoreData
  );

  app.post(
    "/runWithSaving",
    auth.getAuthInfoFromGateway,
    submission.checkNullField,
    controller.runWithStoreData
  );

  app.post(
    "/getSubmissionById",
    auth.getAuthInfoFromGateway,
    controller.getSubmissionById
  );

  app.get(
    "/getAllSubmissions",
    auth.getAuthInfoFromGateway,
    controller.getAllSubmissions
  );
};
