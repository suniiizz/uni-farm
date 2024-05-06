import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/hooks/service/user/context/auth";

const RequiredAuth = ({ children }: PropsWithChildren) => {
  const { auth } = useContext(AuthContext);

  if (!auth) return <Navigate to="/auth/sign-in" />;

  return children;
};

export default RequiredAuth;
