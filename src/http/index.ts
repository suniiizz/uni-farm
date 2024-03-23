import axios from "axios";

const config = {
  baseURL: "https://cors-anywhere.herokuapp.com/http://175.123.253.182/api/",
  withCredentials: true,
};

const http = axios.create(config);

export default http;
