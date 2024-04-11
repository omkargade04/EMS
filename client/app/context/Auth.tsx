"use client";

import { UserCredential, AuthContextType } from "@/type";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<UserCredential>({
    educator_id: 0,
    token: "",
    user: {
      name: "",
      email: "",
      role: "",
      experience: 0,
      institute: "",
      password: "",
      createdAt: "",
      expiresAt: "",
    },
  });

  useEffect(() => {
    const educator_id = localStorage.getItem("educator_id");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setAuthState({ educator_id: educator_id, token: token || "", user });
  }, []);

  const setUserAuthInfo = (data: UserCredential) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuthState(data);
  };

  const isUserAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuth };
