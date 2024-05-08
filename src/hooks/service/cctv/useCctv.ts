import { useEffect, useState } from "react";
import { getCctvList } from "@/http/cctv";
import { CctvDataList } from "control";

const useCctv = (houseNo: string) => {
  const [cctvData, setCctvData] = useState<CctvDataList[]>([]);

  const fetchControlData = async () => {
    await getCctvList(houseNo)
      .then((response) => {
        setCctvData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cctv data:", error);
      });
  };

  const handleRefetch = async () => {
    await fetchControlData();
  };

  useEffect(() => {
    fetchControlData();
  }, [houseNo]);

  return {
    cctvData,
    handleRefetch,
  };
};

export default useCctv;
