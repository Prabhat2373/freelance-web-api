import mongoose, { Schema, Document } from "mongoose";

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | null; // You can use null if the education is ongoing
}

interface EducationDocument extends Education, Document {}

const educationSchema: Schema<EducationDocument> = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, default: null }, // Default to null if the education is ongoing
});

const EducationModel = mongoose.model<EducationDocument>(
  "Education",
  educationSchema
);

export default EducationModel;
