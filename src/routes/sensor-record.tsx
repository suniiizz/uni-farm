import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import SensorRecord from "@/pages/sensor-record";

const sensorRecordRoute: RouteObject = {
  path: "sensor-record",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <SensorRecord />,
    },
  ],
};

export default sensorRecordRoute;
