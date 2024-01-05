import mongoose, { Schema, Document } from "mongoose";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: string;
}

export interface Test extends Document {
  name: string;
  description: string;
  questions: Question[];
}

export const QuestionSchema = new Schema({
  id: String,
  text: String,
  options: [String],
  correctOption: String,
});

export const Question = mongoose.model<Question>("Question", QuestionSchema);
