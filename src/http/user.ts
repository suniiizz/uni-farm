import axios from "axios";

export const signIn = async (params: string) => {
  const formData = new FormData();
  formData.append("member", params);

  const response = await axios.post(
    `http://175.123.253.182:8888/api/update_member?member=${params}`,
    formData,
  );

  return response;
};
