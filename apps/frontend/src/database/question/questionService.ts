import axios from "axios";
import { Question } from "../../../type/Question";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/question";

export const postNewQuestion = async (newQuestion: Question) => {
  return await axios
    .post(BASE_URL, {
      title: newQuestion.title,
      description: newQuestion.description,
      categories: newQuestion.categories,
      complexity: newQuestion.complexity,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw new String(error.response.data.error)
    });
};

export const getAllQuestions = async () => {
  return await axios.get(BASE_URL)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
    throw new String(error.response.data.error)
  });
};

export const getQuestionById = async (id: string) => {
  return await axios.get(BASE_URL + "/" + id)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
    throw new String(error.response.data.error)
  });
};

export const deleteQuestionById = async (id: string) => {
  return await axios.delete(BASE_URL + "/" + id)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
    throw new String(error.response.data.error)
  });
};

export const updateQuestionById = async (
  id: string,
  updatedQuestion: Partial<Question>
) => {
  return await axios.put(BASE_URL + "/" + id, {
    title: updatedQuestion.title,
    description: updatedQuestion.description,
    categories: updatedQuestion.categories,
    complexity: updatedQuestion.complexity,
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
    throw new String(error.response.data.error)
  });
};
