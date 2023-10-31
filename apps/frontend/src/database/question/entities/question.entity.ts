export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  examples: string[];
  testcases: TestCase[];
  constraints: string;
  starterCode: StarterCode[];
  followUp: string;
  dateCreated: Date;
};

export type TestCase = {
  input: string;
  output: string;
};

export type StarterCode = {
  languageId: number;
  code: string;
}

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

export const initialTestCase = {
  input: "",
  output: "",
};

export const initialStarterCode = {
  languageId: -1,
  code: "",
};