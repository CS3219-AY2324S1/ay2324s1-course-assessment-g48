export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  testcases: TestCase[];
  constraints: string;
  followUp: string;
  starterCode: string;
  dateCreated: Date;
};

export type TestCase = {
  input: string;
  output: string;
};
