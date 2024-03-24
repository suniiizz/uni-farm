import axios from "axios";

export const getSensorData = async () => {
  const response = axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/sensor_device_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

export const getControlData = async () => {
  const response = axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/opcl_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

export const updataControlData = async (params) => {
  const response = axios.post(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/control_opcl?farmCode=0002&houseNo=01&opclList=${params}`,
    null,
    {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    },
  );

  return response;
};