import mongoose, { Schema, Document } from "mongoose";

export interface IHireManager extends Document {
  user_account_id: mongoose.Schema.Types.ObjectId;
  registration_date: Date;
  location: string;
  company_id: mongoose.Schema.Types.ObjectId;
}

const hireManagerSchema: Schema<IHireManager> = new Schema<IHireManager>({
  user_account_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const HireManager = mongoose.model<IHireManager>(
  "HireManager",
  hireManagerSchema
);

export default HireManager;
