import mongoose, { Document, Schema } from "mongoose";

interface Question extends Document {
  id: number;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
}

const questionSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    min: 1,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
  },
  categories: {
    type: Array,
    required: true,
    minLength: 1,
  },
  complexity: {
    type: String,
    required: true,
    minLength: 1,
  }
});

questionSchema.set('toJSON', {
  transform: (document: Document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;