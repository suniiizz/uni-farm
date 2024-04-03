import { useEffect, useState } from "react";
import { getControlData } from "@/http/control";
import { ControlData } from "control";

const useControl = () => {
  const [controlData, setControlData] = useState<ControlData[]>([]);

  const fetchControlData = async () => {
    await getControlData()
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
  }, []);

  return {
    controlData,
    handleRefetch,
  };
};

export default useControl;
