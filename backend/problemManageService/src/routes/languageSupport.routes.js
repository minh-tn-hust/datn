const controller = require("../controllers/languageSupport/languageSupport.controller");
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
    '/api/languageSupport/update',
    [
        middleware.auth.getAuthInfoFromGateway,
        middleware.auth.isAdminOrMod
    ],
    controller.updateLanguageSupport,
  );

  app.get(
    '/api/languageSupport/get/:problemId',
    [
        middleware.auth.getAuthInfoFromGateway,
        middleware.auth.isAdminOrMod
    ],
    controller.getAllLanguageSupport
  )
};
