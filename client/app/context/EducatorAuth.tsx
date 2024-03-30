"use client";

import { UserCredential, AuthContextType, EducatorCredential, EducatorAuthContextType } from "@/type";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";

const AuthContext = createContext<EducatorAuthContextType | null>(null);
const { Provider } = AuthContext;

const useAuth = (): EducatorAuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

const EducatorAuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<EducatorCredential>({
    token: "",
    educator: {
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
        const educator = JSON.parse(userString);
        setAuthState({ token: token || "", educator });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.warn("No educator data found in localStorage.");
    }
  }, []);
  
  

  const setEducatorAuthInfo = (data: EducatorCredential) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.educator));
    setAuthState(data);
  };

  const isUserAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setEducatorAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { EducatorAuthProvider, useAuth };