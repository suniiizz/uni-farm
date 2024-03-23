import { useEffect, useState } from "react";
import { getSensorData } from "@/http/control";

const useSensor = () => {
  const [sensorData, setSensorData] = useState([]);

  const fetchSensorData = async () => {
    await getSensorData()
      .then((response) => {
        setSensorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  return {
    sensorData,
  };
};

export default useSensor;
