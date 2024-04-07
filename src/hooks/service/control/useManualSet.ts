import { useEffect, useState } from "react";
import { getManualSetData } from "@/http/control";
import { RelayItem } from "control";

const useManualSet = (id: number) => {
  const [manualSetData, setManualSetData] = useState<RelayItem>([]);

  const fetchManualSetData = async () => {
    await getManualSetData(id.toString())
      .then((response) => {
        setManualSetData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manual setting data:", error);
      });
  };

  useEffect(() => {
    fetchManualSetData();
  }, [id]);

  return {
    manualSetData,
  };
};

export default useManualSet;
