import axios from "axios";

const config = {
  baseURL: "http://175.123.253.182/api/",
  withCredentials: true,
};

const http = axios.create(config);

export default http;
