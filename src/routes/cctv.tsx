import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import Cctv from "@/pages/cctv";

const cctvRoute: RouteObject = {
  path: "cctv",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Cctv />,
    },
  ],
};

export default cctvRoute;
