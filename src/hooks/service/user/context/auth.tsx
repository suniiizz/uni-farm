import { Dispatch, SetStateAction, createContext, useState } from "react";
import { userSignIn } from "@/http/user";

type AuthContextType = {
  auth: boolean;
  signIn: (id: string, password: string) => void;
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

  const signIn = async (id: string, password: string) => {
    await userSignIn(id)
      .then((response) => {
        if (response.data) {
          if (password === response.data.password) {
            window.location.replace("/weather");
            setAuth(true);
          } else {
            alert("비밀번호를 다시 확인해 주세요.");
          }

          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setAuth(true);
          }
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  const signOut = () => {};

  const forceSignOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        // userData,
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
