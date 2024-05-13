import { useEffect, useState } from "react";
import { getControlData } from "@/http/control";
import { ControlData } from "control";

const useControl = (houseNo: string) => {
  const [controlData, setControlData] = useState<ControlData[]>([]);
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);

  const fetchControlData = async () => {
    if (houseNo) {
      await getControlData(houseNo)
        .then((response) => {
          setControlData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching control data:", error);
        });
    }
  };

  const fetchAllControlData = async (index: string) => {
    getControlData(index)
      .then((response) => {
        const setData = index === "1" ? setFirstData : setSecondData;
        setData(response.data);
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
    firstData,
    secondData,
    fetchAllControlData,
  };
};

export default useControl;
