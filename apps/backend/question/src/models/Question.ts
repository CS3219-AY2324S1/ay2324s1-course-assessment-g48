import mongoose, { Document, Schema } from "mongoose";

interface Question extends Document {
  id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
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
    type: Array,
    required: false,
  },
  complexity: {
    type: String,
    required: false,
  }
});


const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;