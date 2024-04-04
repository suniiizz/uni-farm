import Layout from "@/layout";
import { RouteObject } from "react-router-dom";
import AlertList from "@/pages/alert";

const alertRoute: RouteObject = {
  path: "alert",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <AlertList />,
    },
  ],
};

export default alertRoute;
