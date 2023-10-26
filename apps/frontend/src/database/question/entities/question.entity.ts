export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  testcases: TestCase[];
};

export type TestCase = {
  input: string;
  output: string;
};
