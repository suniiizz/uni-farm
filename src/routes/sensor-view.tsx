import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import SensorView from "@/pages/sensor-view";

const sensorViewRoute: RouteObject = {
  path: "sensor-view",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <SensorView />,
    },
  ],
};

export default sensorViewRoute;
