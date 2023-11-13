import { axiosInstance } from "@/utils/axios/AxiosInstance";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_SESSION_URL + "/session/user";

export const getSessionsByUserId = async (
  uid: number,
  accessToken?: string,
  refreshToken?: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ["refresh-token"]: refreshToken,
    },
  };
  return await axiosInstance
    .get(BASE_URL + `/${uid}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/401");
      }
      console.error(error);
      throw String(error.response.data.error);
    });
};

export async function getSession(
  sessionId: string,
  accessToken?: string,
  refreshToken?: string
) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ["refresh-token"]: refreshToken,
    },
  };
  return await axiosInstance
    .get(
      `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionId}`,
      config
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 401) {
        Router.push("/401");
      } else if (error.response.status === 404) {
        Router.push("/404");
      }
      console.error(error);
      //   throw String(error.response.data.error);
    });
}
