import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import ControlRecord from "@/pages/control-record";

const controlRecordRoute: RouteObject = {
  path: "control-record",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <ControlRecord />,
    },
  ],
};

export default controlRecordRoute;
