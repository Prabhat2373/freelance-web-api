import mongoose, { Schema, Document } from "mongoose";

interface IExperienceLevel extends Document {
  name: string;
  description: string;
}

const ExperienceLevelSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const ExperienceLevel = mongoose.model<IExperienceLevel>(
  "ExperienceLevel",
  ExperienceLevelSchema
);
