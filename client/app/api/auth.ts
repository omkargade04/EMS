import api, { baseURL } from "./api";
import axios from "axios";

//Refresh
export const refresh = async () => {
  try {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching user data");
  }
};


//Signup
export const studentSignup = async (
  name: string,
  email: string,
  role: string,
  password: string,
) => {
  try {
    const response = await api.post(
      `${baseURL}/v1/user/student-signup`,
      {
        name: name,
        email: email,
        role: role,
        password: password,
      },
      {
        withCredentials: true, // Include credentials (cookies, HTTP authentication) with the request
      }
    );

    console.log("response", response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error adding student data");
  }
};


//Login
export const login = async (email: string, role: string, password: string) => {
    try {
      const response = await api.post(`${baseURL}/v1/user/signin`, {
        email: email,
        role: role,
        password: password,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log("Error in logging in", err);
      throw new Error("Error fetching educator data");
    }
  };
  
  //Signup
  export const educatorSignup = async (
    name: string,
    email: string,
    role: string,
    institute: string,
    experience: number,
    password: string,
  ) => {
    try {
      const response = await api.post(
        `${baseURL}/v1/user/educator-signup`,
        {
          name: name,
          email: email,
          role: role,
          institute: institute,
          experience: experience,
          password: password,
        },
        {
          withCredentials: true, // Include credentials (cookies, HTTP authentication) with the request
        }
      );
  
      console.log("response", response);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error("Error adding educator data");
    }
  };