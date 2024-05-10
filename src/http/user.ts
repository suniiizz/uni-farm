import axios from "axios";

// [로그인]
export const userSignIn = async (id: string) => {
  const response = await axios.post(
    `http://175.123.253.182:8888/api_main/find_member?memberCode=${id}`,
  );

  return response;
};

// [회원가입]
export const updateRegister = async (params: string) => {
  const response = await axios.post(
    `http://175.123.253.182:8888/api_main/update_member?member=${encodeURI(params)}`,
  );

  return response;
};
