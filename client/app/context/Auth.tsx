"use client";

import { UserCredential, AuthContextType } from "@/type";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";

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
  const [authState, setUserAuthState] = useState<UserCredential>({
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
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserAuthState({ token: token || "", user });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage.");
    }
  }, []);
  
  

  const setUserAuthInfo = (data: UserCredential) => {
    localStorage.setItem("token", data.token!);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserAuthState(data);
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