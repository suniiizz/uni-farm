import axios from "axios";
// import { ajaxRequest } from "@/http/sns";

export const getSensorData = async () => {
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/sensor_device_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

export const getControlData = async () => {
  // const data = {
  //   farmCode: "0002",
  //   houseNo: "01",
  //   enable: "1",
  // };

  // ajaxRequest("http://175.123.253.182:8888/api/opcl_list", data, setControlDatal);

  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/opcl_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

export const updateControlData = async (params: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/control_opcl?farmCode=0002&houseNo=01&opclList=${encodeURI(params)}`,
  );

  return response;
};

export const getManualData = async () => {
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/relay_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

export const updateManualData = async (params: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/control_relay?farmCode=0002&houseNo=01&relayList=${encodeURI(params)}`,
  );

  return response;
};

// 위치별 데이터
export const getControlModalData = async (params: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/opcl_time_control_list?opclId=${encodeURI(params)}`,
  );

  return response;
};

// 설정 저장
export const updateControlSetData = async (params: string, id: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/update_opcl_time_control?opclTimeControlList=${encodeURI(params)} &opclIds=${id}`,
  );

  return response;
};
