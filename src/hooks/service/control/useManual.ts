import { useEffect, useState } from "react";
import { getManualData } from "@/http/control";

const useManual = () => {
  const [manualData, setManualData] = useState([]);

  const fetchManualData = async () => {
    await getManualData()
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
