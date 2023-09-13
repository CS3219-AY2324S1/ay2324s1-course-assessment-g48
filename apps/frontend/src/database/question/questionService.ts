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
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getQuestionById = async (id: string) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const deleteQuestionById = async (id: string) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  console.log(response);
  return response.data;
};

export const updateQuestionById = async (
  id: string,
  updatedQuestion: Partial<Question>
) => {
  const response = await axios.put(BASE_URL + "/" + id, {
    title: updatedQuestion.title,
    description: updatedQuestion.description,
    categories: updatedQuestion.categories,
    complexity: updatedQuestion.complexity,
  });
  return response.data;
};
