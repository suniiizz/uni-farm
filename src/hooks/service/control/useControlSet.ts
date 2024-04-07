import { useEffect, useState } from "react";
import { getControlModalData } from "@/http/control";
import { OpclData } from "control";

const useControlSet = (id: number) => {
  const [controlSetData, setControlSetData] = useState<OpclData>([]);

  const fetchControlSetData = async () => {
    await getControlModalData(id.toString())
      .then((response) => {
        setControlSetData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching control setting data:", error);
      });
  };

  useEffect(() => {
    fetchControlSetData();
  }, [id]);

  return {
    controlSetData,
  };
};

export default useControlSet;
