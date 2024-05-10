import { updateCctvList } from "@/http/cctv";

const useUpdateCctv = () => {
  const updateCctvData = async (params: string) => {
    await updateCctvList(params).then((response) => {
      if (response.status === 200) {
        alert("저장하였습니다.");
      }
    });
  };

  return {
    updateCctvData,
  };
};

export default useUpdateCctv;
