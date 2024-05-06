import { Dispatch, SetStateAction, createContext, useState } from "react";
import { SignInRequest } from "user";

type AuthContextType = {
  auth: boolean;
  signIn: (prams: SignInRequest) => void;
  signOut: () => void;
  forceSignOut: () => void;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

interface Props {
  children: React.ReactNode;
}

const accessToken = localStorage.getItem("accessToken") ? true : false;

export const AuthContext = createContext<AuthContextType>({
  auth: accessToken,
  signIn: () => {
    return;
  },
  signOut: () => {
    return;
  },
  forceSignOut: () => {
    return;
  },
  setAuth: () => {
    return;
  },
});

export const AuthContextProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(accessToken);

  const signIn = () => {};

  const signOut = () => {};

  const forceSignOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        signIn,
        signOut,
        forceSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
