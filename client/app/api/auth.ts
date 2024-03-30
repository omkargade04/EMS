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

//Login
export const studentLogin = async (email: string, password: string) => {
  try {
    const response = await api.post(`${baseURL}/v1/student/signin`, {
      email: email,
      password: password,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log("Error in logging in", err);
    throw new Error("Error fetching student data");
  }
};

//Signup
export const studentSignup = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post(
      `${baseURL}/v1/student/signup`,
      {
        name: name,
        email: email,
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
export const educatorLogin = async (email: string, password: string) => {
    try {
      const response = await api.post(`${baseURL}/v1/educator/signin`, {
        email: email,
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
    password: string,
  ) => {
    try {
      const response = await api.post(
        `${baseURL}/v1/educator/signup`,
        {
          name: name,
          email: email,
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