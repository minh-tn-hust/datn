import { api_pb } from "@/network";

const AdminApi = {};

AdminApi.getAllProblems = () => {
  return api_pb().get("api/problem/get");
};

AdminApi.getAProblem = (id) => {
  return api_pb().get("/api/problem/getAProblem/" + id);
};

AdminApi.createProblem = ({
  hardLevel,
  problemName,
  description,
  statement,
  input,
  output,
}) => {
  return api_pb().post("api/problem/create", {
    hardLevel: hardLevel,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
  });
};

AdminApi.updateProblem = ({
  id,
  hardLevel,
  categories,
  updatedAt,
  problemName,
  description,
  statement,
  input,
  output,
}) => {
  return api_pb().post("api/problem/edit", {
    problemId: id,
    hardLevel: hardLevel,
    categories: categories,
    updatedAt: updatedAt,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
  });
};

AdminApi.deleteAProblem = (problemId) => {
  return api_pb().delete("/api/problem/deleteAProblem/" + problemId);
};

AdminApi.getAllTestcases = (id) => {
  return api_pb().get("/api/testcase/getAllTestcases/" + id);
};

AdminApi.createTestcase = ({ input, output, explaination, problemId }) => {
  return api_pb().post("/api/testcase/addTestcase", {
    input: input,
    output: output,
    explaination: explaination,
    problemId: problemId,
  });
};

AdminApi.updateTestcase = ({ testcaseId, input, output, explaination }) => {
  return api_pb().post("/api/testcase/editTestcase", {
    testcaseId: testcaseId,
    input: input,
    output: output,
    explaination: explaination,
  });
};

AdminApi.deleteTestcase = (testcaseId) => {
  return api_pb().delete("/api/testcase/deleteTestcase/" + testcaseId);
};

export default AdminApi;
