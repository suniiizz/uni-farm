import { RouteObject } from "react-router-dom";
import Layout from "@/layout";
import UserList from "@/pages/user";

const userRoute: RouteObject = {
  path: "user",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <UserList />,
    },
  ],
};

export default userRoute;
