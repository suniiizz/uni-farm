import axios from "axios";

export const updateRegister = async (params: string) => {
  const response = await axios.post(
    `http://175.123.253.182:8888/update_member?member=${params}`,
  );

  return response;
};
