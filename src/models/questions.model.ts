import mongoose, { Schema, Document } from "mongoose";

export interface IOptions {
  name: string;
}

const questionOptionSchema = new Schema<IOptions>({
  name: { type: String, required: true },
});

export interface Question {
  text: string;
  options: IOptions[];
  correctOption: string;
}

export interface Test extends Document {
  name: string;
  description: string;
  questions: Question[];
}

export const QuestionSchema = new Schema({
  text: String,

  // options: [questionOptionSchema],
  // options: [{ type: [{ name: String }], required: true }],
  // options: [{ type: String, required: true }],
  // options: { type: Number, required: true },
  options: [questionOptionSchema],

  correctOption: String,
});

console.log("QuestionSchema", QuestionSchema);

export const Question = mongoose.model<Question>("Question", QuestionSchema);
