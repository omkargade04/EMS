import axios from "axios";
export const baseURL = "http://localhost:5000";
// export const baseURL = `https://alumni-backend-q2j4.onrender.com`

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
  },
  withCredentials: true,
});

export const apiFromData = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
  },
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log("Entered in axios instance");
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${baseURL}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    if (error.response.status === 400) {
      console.log(error.response.data.message);
    }
    throw error;
  }
);

apiFromData.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${baseURL}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    if (error.response.status === 400) {
      console.log(error.response.data.message);
    }
    throw error;
  }
);