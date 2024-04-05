import { Key, ReactNode } from "react";

export type LoginForm = {
    email: string;
    password: string;
    role: string;
  };

  export type AdminLoginForm = {
    password: string;
    name: string;
  };
  
  export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    role: string,
    institute: string,
    experience: number,
  };

  export type UserRegisterForm = {
    name: string;
    email: string;
    role: string,
    password: string;
  };
  export type UserData = {
    name: string;
    email: string;
    role: string;
    experience: number,
    institute: string,
    password: string;
    createdAt: string;
    expiresAt: string;
  };
  
  export type GoogleCredential = {
    accesstoken: string;
    user: {
      name: string;
      email: string;
    };
  };
  
  export type UserCredential = {
    authState: any;
    educator_id: any;
    token: string;
    user: UserData;
  };

  // export type EducatorCredential = {
  //   token: string;
  //   educator: UserData;
  // };
  
  export type AuthContextType = {
    authState: UserCredential;
    setUserAuthInfo: (data: UserCredential) => void;
    isUserAuthenticated: () => boolean;
  };

  export type Course = {
    map(arg0: (chapter: any) => import("react").JSX.Element): ReactNode;
    description: ReactNode;
    price: ReactNode;
    title: ReactNode;
    chapter_id: Key | null | undefined;
    course_title: string,
    course_description: string,
    course_price: number,
    name: string,
    institute: string,
    experience: number,
    role: string,
    email: string,
  }

  export type course = {
    id: number,
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    name: string,
    institute: string,
    experience: number,
    role: string,
    email: string,
    chapters: [],
  }

  // export type EducatorAuthContextType = {
  //   authState: EducatorCredential;
  //   setEducatorAuthInfo: (data: EducatorCredential) => void;
  //   isUserAuthenticated: () => boolean;
  // };