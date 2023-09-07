import axios from "axios";
import { Question } from "../../../../components/Question";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/question"


export const postNewQuestion = async (newQuestion: Question) => {
  await axios.post(BASE_URL, {
    title: newQuestion.title,
    description: newQuestion.description,
    categories: newQuestion.categories,
    complexity: newQuestion.complexity,
  }).then((response) => {
    console.log(response);
    console.log(typeof response.data._id);
  }
  ).catch((error) => {
    console.log(error);
  });
}

export const getQuestions = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
}