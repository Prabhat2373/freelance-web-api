import mongoose, { Schema, Document } from "mongoose";

export interface IComplexity extends Document {
  complexity_text: string;
}

const complexitySchema: Schema<IComplexity> = new Schema<IComplexity>({
  complexity_text: String,
});

const Complexity = mongoose.model<IComplexity>("Complexity", complexitySchema);

export default Complexity;
