import mongoose, { Document, Schema } from "mongoose";

interface Question extends Document {
  id: string;
  title: string;
  description: string;
  categories: string[];
  complexity: string;
  testcases: [{
    number: number;
    input: string;
    output: string;
  }]
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
  testcases: [
    {
      number: {
        type: Number,
        required: false,
      },
      input: {
        type: String,
        required: false,
      },
      output: {
        type: String,
        required: false,
      },
    }
  ]
});

// Removes the __v: 0 attribute 
questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
  }
})

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;