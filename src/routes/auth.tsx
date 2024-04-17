import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/user/sign-in";
import JoinInPage from "@/pages/user/register";

const authRoute: RouteObject = {
  path: "auth",
  children: [
    {
      path: "sign-in",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <JoinInPage />,
    },
  ],
};

export default authRoute;
