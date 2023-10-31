import mongoose, { Document, Schema } from "mongoose";
import { LanguageId } from "./enum/LanguageId";
import { Category } from "./enum/Category";
import { Complexity } from "./enum/Complexity";

// console.log("time:" , moment().tz("Asia/Singapore").format())

interface Question extends Document {
  id: string;
  // left side of question page
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  examples: string[];
  constraints: string;
  followUp: string;
  // right side of question page
  starterCode: [{
    languageId: number,
    code: string
  }],
  testcases: [{
    input: string;
    output: string;
  }]
  dateCreated: Date;
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
      enum: Object.values(Category),    
    }],
    required: false,
  },
  complexity: {
    type: String,
    enum: Object.values(Complexity),
    required: false,
  },
  examples: [{
    type: String,
    required: false,
  }],
  constraints: {
    type: String,
    required: false,
  },
  followUp: {
    type: String,
    required: false,
  },
  starterCode: [
    {
      languageId: {
        type: Number,
        enum: Object.values(LanguageId).filter((v) => !isNaN(Number(v))),
        required: false,
      },
      code: {
        type: String,
        required: false,
      },
    }
  ],
  testcases: [
    {
      input: {
        type: String,
        required: false,
      },
      output: {
        type: String,
        required: false,
      },
    }
  ],
  dateCreated: {
    type: Date,
    // Dysfunctional
    default: Date.now,
    required: false,
  }, 
},  
{versionKey: false} // Removes the __v: 0 attribute
);


// Removes the __v: 0 attribute 
questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
    // // Remove _id from the testcases array
    // if (Array.isArray(returnedObject.testcases)) {
    //   returnedObject.testcases = returnedObject.testcases.map((tc) => {
    //     const { _id, ...rest } = tc;
    //     delete tc.__v;
    //     return rest;
    //   });
    // }
  }
})

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;