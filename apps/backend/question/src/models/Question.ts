import mongoose, { Document, Schema } from "mongoose";

interface Question extends Document {
  id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  inputs: string[];
  outputs: string[];
  constraints: string;
  followUp: string;
  starterCode: string;
}

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  categories: {
    type: [{
      type: String,
      enum: ["Algorithms","Bit Manipulation","Brainteaser","Databases","Data Structures","Recursion","Strings"],    
    }],
    required: false,
  },
  complexity: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: false,
  },
  inputs: {
    type: [{type: String}],
    required: false,
  },
  outputs: {
    type: [{type: String}],
    required: false,
  },
  constraints: {
    type: String,
    required: false,
  },
  followUp: {
    type: String,
    required: false,
  },
  starterCode: {
    type: String,
    required: false,
  }
});


const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;