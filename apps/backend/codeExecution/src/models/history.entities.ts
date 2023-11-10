export type History = {
  userIds: number[];
  sessionId: string;
  completed: CompletedQuestion[];
  date: Date;
  _id: string;
}

export type HistoryQuestionTestcase = {
  runTime: number;
  outcome: string;
}

export type CompletedQuestion = {
  questionId: string;
  questionTitle: string;
  language: string
  answer: string;
  testcases: HistoryQuestionTestcase[];
  completedAt: Date;
  result: string;
}