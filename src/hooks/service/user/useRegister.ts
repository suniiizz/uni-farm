import { updateRegister } from "@/http/user";
import { UpdateRegisterUserForm } from "user";

const useRegister = () => {
  const fetchUserData = async (params: UpdateRegisterUserForm) => {
    await updateRegister(JSON.stringify(params))
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleRefetch = async (params: UpdateRegisterUserForm) => {
    await fetchUserData(params);
  };

  return {
    handleRefetch,
    fetchUserData,
  };
};

export default useRegister;
