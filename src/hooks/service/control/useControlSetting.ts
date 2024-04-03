import { useEffect, useState } from "react";
import { getControlModalData } from "@/http/control";

const useControlSetting = (id: number) => {
  const [controlSetData, setControlSetData] = useState([]);

  const fetchControlSetData = async () => {
    await getControlModalData(id)
      .then((response) => {
        setControlSetData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching control setting data:", error);
      });
  };

  useEffect(() => {
    fetchControlSetData();
  }, []);

  return {
    controlSetData,
  };
};

export default useControlSetting;
