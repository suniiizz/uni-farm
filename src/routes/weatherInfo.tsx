import Layout from "../layout";
import { RouteObject } from "react-router-dom";
import WeatherInfo from "@/components/pages/weather";

const weatherRoute: RouteObject = {
  path: "weather",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <WeatherInfo />,
    },
  ],
};

export default weatherRoute;
