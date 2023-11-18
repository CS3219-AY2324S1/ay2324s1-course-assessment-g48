import { Question } from "./entities/question.entity";
import Router from "next/router";
import { axiosInstance } from "@/utils/axios/AxiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_QUESTION_SERVICE + "/api/question";

export const postNewQuestion = async (
  accessToken: string,
  refreshToken: string,
  newQuestion: Question
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ["refresh-token"]: refreshToken,
    },
  };
  return await axiosInstance
    .post(BASE_URL, newQuestion, config)
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

export const getAllQuestions = async (
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
    .get(BASE_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (error.response.status === 401) {
        Router.push("/401");
      }
      console.error(error);
      throw String(error.response.data.error);
    });
};

export const getQuestionById = async (
  id: string,
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
    .get(BASE_URL + "/" + id, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Router.push("/401");
        }
        // The request was made, but the server responded with a status code
        throw String(error.response.data.error);
      } else if (error.request) {
        // The request was made, but no response was received
        throw String("No response received, please try again later");
      } else {
        // Something happened in setting up the request that triggered an error
        throw String(error.message);
      }
    });
};

export const deleteQuestionById = async (
  id: string,
  accessToken: string,
  refreshToken: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ["refresh-token"]: refreshToken,
    },
  };
  return await axiosInstance
    .delete(BASE_URL + "/" + id, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Router.push("/401");
        }
        // The request was made, but the server responded with a status code
        throw new String(error.response.data.error);
      } else if (error.request) {
        // The request was made, but no response was received
        throw new String("No response received, please try again later");
      } else {
        // Something happened in setting up the request that triggered an error
        throw new String(error.message);
      }
    });
};

export const updateQuestionById = async (
  id: string,
  accessToken: string,
  refreshToken: string,
  updatedQuestion: Partial<Question>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ["refresh-token"]: refreshToken,
    },
  };
  return await axiosInstance
    .put(BASE_URL + "/" + id, updatedQuestion, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Router.push("/401");
        }
        // The request was made, but the server responded with a status code
        throw new String(error.response.data.error);
      } else if (error.request) {
        // The request was made, but no response was received
        throw new String("No response received, please try again later");
      } else {
        // Something happened in setting up the request that triggered an error
        throw new String(error.message);
      }
    });
};
