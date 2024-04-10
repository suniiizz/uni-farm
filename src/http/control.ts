import axios from "axios";
// import { ajaxRequest } from "@/http/sns";

// [원격제어 - 가운데 박스] 데이터
export const getSensorData = async () => {
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/sensor_device_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

// [원격제어 - 슬라이더] 데이터
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

// [원격제어 - 슬라이더] 데이터 업데이트
export const updateControlData = async (params: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/control_opcl?farmCode=0002&houseNo=01&opclList=${encodeURI(params)}`,
  );

  return response;
};

// [원격제어 - 하단 설정 버튼] 데이터
export const getManualData = async () => {
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/relay_list?farmCode=0002&houseNo=01&enable=1",
  );

  return response;
};

// [원격제어 - 하단 설정 버튼] on/off 업데이트
export const updateManualData = async (params: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/control_relay?farmCode=0002&houseNo=01&relayList=${encodeURI(params)}`,
  );

  return response;
};

// [원격제어 - 하단 설정 버튼] - 제어설정 데이터
export const getManualSetData = async (id: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/relay_time_control_list?relayId=${id}`,
  );

  return response;
};

// [원격제어 - 하단 설정 버튼] - 제어설정 데이터 업데이트
export const updateManualSetData = async (params: string, id: string) => {
  const formData = new FormData();
  formData.append("relayIds", id);
  formData.append("relayTimeControlList", params);

  const response = await axios.post(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/update_relay_time_control`,
    formData,
  );

  return response;
};

// [원격제어 - 제어설정] 상단 위치별 데이터
export const getControlModalData = async (id: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/opcl_time_control_list?opclId=${id}`,
  );

  return response;
};

// [원격제어 - 제어설정] 설정 저장
export const updateControlSetData = async (params: string, id: string) => {
  const formData = new FormData();
  formData.append("opclIds", id);
  formData.append("opclTimeControlList", params);

  const response = await axios.post(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/api/update_opcl_time_control`,
    formData,
  );

  return response;
};
