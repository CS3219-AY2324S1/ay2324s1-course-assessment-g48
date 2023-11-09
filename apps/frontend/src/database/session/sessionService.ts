import axios from "axios";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_SESSION_URL + "/session/user";

// Get history by id
export const getSessionsByUserId = async (
  uid: number
  //   accessToken?: string,
  //   refreshToken?: string
) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       ["refresh-token"]: refreshToken,
  //       questionid: qid,
  //     },
  //   };
  return await axios
    .get(BASE_URL + `/${uid}`)
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
