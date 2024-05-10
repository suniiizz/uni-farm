import axios from "axios";

export const getCctvList = async (houseNo: string) => {
  const response = await axios.get(
    `http://175.123.253.182:8888/api_main/cctv_list?farmCode=0002&houseNo=0${houseNo}&enable=1`,
  );

  return response;
};

export const updateCctvList = async (params: string) => {
  const response = await axios.post(
    `http://175.123.253.182:8888/api_main/update_cctv?cctv=${encodeURI(params)}`,
  );

  return response;
};
