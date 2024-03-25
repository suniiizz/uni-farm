import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getControlData } from "@/http/control";
import { ajaxRequest } from "@/http/sns";

const useControl = () => {
  const [controlData, setControlData] = useState([]);

  const fetchControlData = async () => {
    var data = {
      farmCode : '0002',
      houseNo : '01',
      enable : '1'
    };

console.log('fetchControlData : ', data);

    ajaxRequest('http://175.123.253.182:8888/api/opcl_list', data, setControlData);

/*
    await getControlData()
      .then((response) => {
        setControlData(response.data);
      
      .catch((error) => {
        console.error("Error fetching control data:", error);
      });
*/
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

