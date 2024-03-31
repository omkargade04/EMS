export type LoginForm = {
    email: string;
    password: string;
    role: string;
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

  // export type EducatorAuthContextType = {
  //   authState: EducatorCredential;
  //   setEducatorAuthInfo: (data: EducatorCredential) => void;
  //   isUserAuthenticated: () => boolean;
  // };