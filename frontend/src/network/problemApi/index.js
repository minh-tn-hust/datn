import { api_code_executing, api_pb } from "..";

const ProblemApi = {};

ProblemApi.getAllProblem = function () {
  return api_pb().get("/api/problem/getAllProblems");
};

ProblemApi.getProblemByFilter = function (hardLevel, status, categories) {
  let ct = categories.length ? "&ct[]=" + categories.join("&ct[]=") : "";
  if (categories.includes("all")) {
    ct = "";
  }
  return api_pb().get(
    "/api/problem/getProblem?hl=" + hardLevel + "&st=" + status + ct
  );
};

ProblemApi.getProblemById = function (id) {
  return api_pb().get("/api/problem/getAProblem/" + id);
};

ProblemApi.updateProblem = ({
  id,
  hardLevel,
  problemName,
  description,
  statement,
  input,
  output,
}) => {
  return api_pb().post("/api/problem/edit", {
    problemId: id,
    hardLevel: hardLevel,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
  });
};

ProblemApi.runWithoutSaving = ({ code, problemId, language }) => {
  return api_code_executing().post("/runWithoutSaving", {
    source: code,
    problemId: problemId,
    language: language,
  });
};

ProblemApi.runWithSaving = ({ code, problemId, language }) => {
  return api_code_executing().post("/runWithSaving", {
    source: code,
    problemId: problemId,
    language: language,
  });
};

ProblemApi.getSubmissionById = ({ problemId }) => {
  return api_code_executing().post("/getSubmissionById", {
    problemId: problemId,
  });
};

ProblemApi.getAllSubmissions = () => {
  return api_code_executing().get("/getAllSubmissions");
};

export default ProblemApi;
