import { useEffect, useState } from "react";
import { getManualData } from "@/http/control";
import { ManualItem } from "control";

const useManual = (houseNo: string) => {
  const [manualData, setManualData] = useState<ManualItem[]>([]);

  const fetchManualData = async () => {
    await getManualData(houseNo)
      .then((response) => {
        setManualData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manual data:", error);
      });
  };

  const handleRefetch = async () => {
    await fetchManualData();
  };

  useEffect(() => {
    fetchManualData();
  }, []);

  return {
    manualData,
    handleRefetch,
  };
};

export default useManual;
