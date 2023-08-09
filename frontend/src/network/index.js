import axios from "axios";

// const BASE_URL_AUTHEN = "http://localhost:3001";
const BASE_URL_AUTHEN = "http://localhost:8000/auth";
const BASE_URL_PB = "http://localhost:8000/problem-manage";
const BASE_URL_CODE_EXECUTING = "http://localhost:8000/execution-service";

const getHeader = function () {
  let access_token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
  let header;
  if (access_token) {
    header = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "x-access-token" : access_token,
    };
  } else {
    header = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    };
  }
  if (process.env.ENV === "dev") {
    header["x-authen-info"] = JSON.stringify(JSON.stringify({userId : 1, authenedRoles : ["mod, user"]}));
  }
  return header;
};


const api = () => axios.create({
  baseURL: BASE_URL_AUTHEN,
  timeout: 30000,
  headers: getHeader(),
  validateStatus: false,
});

//get api problem
const api_pb = () => axios.create({
  baseURL: BASE_URL_PB,
  timeout: 30000,
  headers: getHeader(),
  // validateStatus: false,
});

const api_code_executing = () => axios.create({
  baseURL: BASE_URL_CODE_EXECUTING,
  timeout: 30000,
  headers: getHeader(),
  validateStatus: false,
});

export { api, api_pb, api_code_executing };
