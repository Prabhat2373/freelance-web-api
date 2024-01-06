import mongoose, { Schema, Document } from "mongoose";
import { Question, QuestionSchema } from "./questions.model";

export interface ITest extends Document {
  text: string;
  description: string;
  questions: Question[];
}

console.log("inside test");

const TestSchema = new Schema({
  namee: {
    type: String,
    required: true,
  },
  // text: String,
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: String,
      options: [
        {
          name: String,
        },
      ],
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],
});

console.log("TestSchema", TestSchema);

export const Test = mongoose.model<ITest>("Test", TestSchema);
