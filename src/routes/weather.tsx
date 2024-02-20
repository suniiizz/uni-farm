import { RouteObject } from "react-router-dom";
import Layout from "@/layout";
import WeatherInfo from "@/pages/weather";

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
