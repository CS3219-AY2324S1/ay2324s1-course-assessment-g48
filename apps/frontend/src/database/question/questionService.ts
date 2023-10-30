import axios from "axios";
import { Question } from "./entities/question.entity";
import { Role } from "@/utils/enums/Role";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_QUESTION_SERVICE + "/api/question";

export const postNewQuestion = async (
  newQuestion: Question,
  userRole: Role
) => {
  const config = {
    headers: {
      role: userRole,
    },
  };
  return await axios
    .post(
      BASE_URL,
      newQuestion,
      config
    )
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

export const getAllQuestions = async (userRole?: Role) => {
  const config = {
    headers: {
      role: userRole,
    },
  };
  return await axios
    .get(BASE_URL, config)
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

export const getQuestionById = async (id: string, userRole?: Role) => {
  const config = {
    headers: {
      role: userRole,
    },
  };
  return await axios
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

export const deleteQuestionById = async (id: string, userRole: Role) => {
  const config = {
    headers: {
      role: userRole,
    },
  };
  return await axios
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
  updatedQuestion: Partial<Question>,
  userRole: Role
) => {
  const config = {
    headers: {
      role: userRole,
    },
  };
  return await axios
    .put(
      BASE_URL + "/" + id,
      updatedQuestion,
      config
    )
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
