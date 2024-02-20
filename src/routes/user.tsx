import Layout from "../layout";
import { RouteObject } from "react-router-dom";
import UserList from "@/components/pages/user";

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
