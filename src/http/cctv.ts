import axios from "axios";

export const getCctvList = async (houseNo: string) => {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/cctv_list?farmCode=0002&houseNo=0${houseNo}&enable=1`,
  );

  return response;
};

export const updateCctvList = async (params: string) => {
  const response = await axios.post(
    `https://cors-anywhere.herokuapp.com/http://175.123.253.182:8888/update_cctv?cctv=${encodeURI(params)}`,
  );

  return response;
};
