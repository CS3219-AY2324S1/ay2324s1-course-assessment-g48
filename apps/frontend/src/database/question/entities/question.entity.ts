export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  examples: string[];
  testcases: TestCase[];
  constraints: string;
  starterCode: CodeType[];
  followUp: string;
  dateCreated: Date;
};

export type TestCase = {
  input: string;
  output: string;
};

export type CodeType = {
  languageId: number;
  code: string;
};

export const initialQuestion = {
  _id: "",
  title: "",
  description: "",
  categories: [],
  complexity: "",
  examples: [],
  testcases: [],
  constraints: "",
  followUp: "",
  starterCode: [],
  dateCreated: new Date(),
};

export const emptyTestCase = {
  input: "",
  output: "",
};
