import { RouteObject } from "react-router-dom";
import Layout from "@/layout";
import FarmList from "@/pages/farm";

const farmRoute: RouteObject = {
  path: "farm",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <FarmList />,
    },
  ],
};

export default farmRoute;
