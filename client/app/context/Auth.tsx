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
  const [authState, setAuthState] = useState<UserCredential>({
    token: "",
    student: {
      name: "",
      email: "",
      password: "",
      token: "",
      createdAt: "",
      expiresAt: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const student = JSON.parse(userString);
        setAuthState({ token: token || "", student });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.warn("No user data found in localStorage.");
    }
  }, []);
  
  

  const setUserAuthInfo = (data: UserCredential) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.student));
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