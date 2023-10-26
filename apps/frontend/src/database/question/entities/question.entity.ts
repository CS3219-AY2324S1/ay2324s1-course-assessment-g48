export type Question = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  inputs: string[];
  outputs: string[];
  constraints: string;
  followUp: string;
  starterCode: string;
};
