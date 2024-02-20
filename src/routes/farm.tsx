import Layout from "../layout";
import { RouteObject } from "react-router-dom";
import FarmList from "@/components/pages/control/farm";

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
