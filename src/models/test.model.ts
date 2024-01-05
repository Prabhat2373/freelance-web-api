import mongoose, { Schema, Document } from "mongoose";
import { Question, QuestionSchema } from "./questions.model";

export interface Test extends Document {
  name: string;
  description: string;
  questions: Question[];
}

const TestSchema = new Schema({
  name: String,
  description: String,
  questions: [QuestionSchema],
});

export const Test = mongoose.model<Test>("Test", TestSchema);
