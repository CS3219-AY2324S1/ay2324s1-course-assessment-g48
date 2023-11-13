import axios, { AxiosInstance } from "axios";

const REFRESH_URL =
  process.env.NEXT_PUBLIC_USER_SERVICE + "/api/users/refreshJwt";

export const axiosInstance: AxiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;
      try {
        const response = await axios.get(REFRESH_URL, {
          headers: {
            "refresh-token": error.config.headers["refresh-token"],
          },
        });
        const newAccessToken = response.data.accessToken;
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        const newResponse = await axios.request(error.config);
        newResponse.data.accessToken = newAccessToken;
        return newResponse;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
