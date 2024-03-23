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
      // params: {
      //   id: params.id,
      //   no: params.no,
      //   enable: params.enable,
      //   shape: params.shape,
      //   shapeName: params.shapeName,
      //   location: params.location,
      //   outputNo: params.outputNo,
      //   value: params.value,
      //   controlMode: params.controlMode,
      //   houseNo: params.houseNo,
      //   farmCode: params.farmCode,
      // },
      // headers: {
      //   "Content-Type": "application/json",
      // },
    },
  );

  return response;
};
