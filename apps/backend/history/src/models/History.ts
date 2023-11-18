import mongoose, { Document, Schema } from "mongoose";

interface CompletedQuestion extends Document {
  questionId: string;
  questionTitle: string;
  language: string
  answer: string;
  result: string;
  testcases: HistoryQuestionTestcase[];
  completedAt: Date;
  id: string;
}

interface HistoryQuestionTestcase extends Document {
  runTime: number;
  outcome: string;
  id:string
}

interface History extends Document {
  id: string;
  userIds: number[];
  sessionId: string;
  completed: CompletedQuestion[];
  date: Date;
}



const historyQuestionTestcaseSchema = new Schema({
  runTime: {
    type: Number,
    required: true,
  },
  outcome: {
    type: String,
    required: true,
  },
});

const completedQuestionSchema = new Schema({
  questionId: {
    type: String,
    required: true,
  },
  questionTitle: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  testcases: {
    type: [historyQuestionTestcaseSchema],
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const historySchema = new Schema({
  userIds: {
    type: [{
        type: Number,
      }],
    required: true,
  },
  sessionId: {
    type: String,
    required: false,
      
  },
  completed: {
    type: [completedQuestionSchema],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

completedQuestionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
completedQuestionSchema.set('toJSON', { virtuals: true });

const HistoryModel = mongoose.model("History", historySchema);

export default HistoryModel;
