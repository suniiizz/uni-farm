import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import WeatherControl from "@/pages/control/index";

const controlRoute: RouteObject = {
  path: "control",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <WeatherControl />,
    },
  ],
};

export default controlRoute;
