getAuthInfoFromGateway = (req, res, next) => {
  let infoHeader = req.headers["x-authen-info"];

  if (!infoHeader) {
    res.status(404).send({
      message: "Unauthorized",
    });
  }

  let info = JSON.parse(JSON.parse(infoHeader));
  req.userId = info.userId;
  req.authenedRoles = info.authenedRoles;
  next();
};

checkNullFields = (req, res, next) => {
  const requiredFields = [
    "problemName",
    "description",
    "statement",
    "input",
    "output",
    "hardLevel",
  ];
  const missingFields = [];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      listFields: missingFields,
      message: `Missing required fields`,
    });
  } else {
    next();
  }
};

const problemMiddleware = {
  checkNullFields: checkNullFields,
  getAuthInfoFromGateway: getAuthInfoFromGateway,
};
module.exports = problemMiddleware;
