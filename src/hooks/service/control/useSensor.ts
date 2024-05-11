import { useEffect, useState } from "react";
import { getSensorData } from "@/http/control";
import { SensorData } from "control";

const useSensor = (houseNo: string) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const fetchSensorData = async () => {
    await getSensorData(houseNo)
      .then((response) => {
        setSensorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  };

  useEffect(() => {
    fetchSensorData();
  }, [houseNo]);

  return {
    sensorData,
  };
};

export default useSensor;
