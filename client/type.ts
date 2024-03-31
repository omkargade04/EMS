export type LoginForm = {
    email: string;
    password: string;
  };
  
  export type RegisterForm = {
    name: string;
    email: string;
    password: string;
  };
  export type UserData = {
    name: string;
    email: string;
    password: string;
    token: string;
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
    token: string;
    student: UserData;
  };

  export type EducatorCredential = {
    token: string;
    educator: UserData;
  };
  
  export type AuthContextType = {
    userAuthState: UserCredential;
    setUserAuthInfo: (data: UserCredential) => void;
    isUserAuthenticated: () => boolean;
  };

  export type EducatorAuthContextType = {
    authState: EducatorCredential;
    setEducatorAuthInfo: (data: EducatorCredential) => void;
    isUserAuthenticated: () => boolean;
  };