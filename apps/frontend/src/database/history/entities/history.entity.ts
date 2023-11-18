export type History = {
  userIds: number[];
  sessionId: string;
  completed: CompletedQuestion[];
  date: Date;
  _id: string;
}

export type HistoryQuestionTestcase = {
  runTime: number;
  outcome: number;
}

export type CompletedQuestion = {
  questionId: string;
  questionTitle: string;
  language: string
  answer: string;
  testcases: HistoryQuestionTestcase[];
  completedAt: Date;
  result: string;
  _id?: string;
}

export const initialHistory = {
  userIds: [],
  sessionId: "",
  completed: [],
  date: new Date(),
  _id: ""
};