import mongoose, { Schema, Document } from "mongoose";

export interface IEmploymentHistory extends Document {
  freelancer_id: mongoose.Schema.Types.ObjectId;
  company_name: string;
  position: string;
  description: string;
  skills_used: mongoose.Types.ObjectId[];
  start_date: Date;
  end_date: Date;
}

const employmentHistorySchema: Schema<IEmploymentHistory> =
  new Schema<IEmploymentHistory>({
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    company_name: String,
    position: String,
    description: String,
    skills_used: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    start_date: Date,
    end_date: Date,
  });

const EmploymentHistory = mongoose.model<IEmploymentHistory>(
  "EmploymentHistory",
  employmentHistorySchema
);

export default EmploymentHistory;
