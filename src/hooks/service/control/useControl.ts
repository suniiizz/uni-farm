import { useEffect, useState } from "react";
import { getControlData } from "@/http/control";
import { ControlData } from "control";

const useControl = (houseNo: string) => {
  const [controlData, setControlData] = useState<ControlData[]>([]);

  const fetchControlData = async () => {
    await getControlData(houseNo)
      .then((response) => {
        setControlData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching control data:", error);
      });
  };

  const handleRefetch = async () => {
    await fetchControlData();
  };

  useEffect(() => {
    fetchControlData();
  }, [houseNo]);

  return {
    controlData,
    handleRefetch,
  };
};

export default useControl;
