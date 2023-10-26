export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  testcases: [
    {
      number: number;
      input: string;
      output: string;
    },
  ];
  constraints: string;
  followUp: string;
  starterCode: string;
  dateCreated: Date;
};
