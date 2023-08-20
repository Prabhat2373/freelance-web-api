import mongoose, { Schema, Document } from "mongoose";
import Freelancer from "./freelancer.model";

export interface IEmploymentHistory extends Document {
  freelancer_id: mongoose.Schema.Types.ObjectId;
  company_name: string;
  position: string;
  description: string;
  skills_used: mongoose.Types.ObjectId[];
  start_date: Date;
  end_date?: Date;
  currently_working: boolean;
  employment_type: string;
}

const employmentHistorySchema: Schema<IEmploymentHistory> =
  new Schema<IEmploymentHistory>({
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    company_name: String,
    position: String,
    description: String,
    skills_used: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    start_date: Date,
    end_date: { type: Date, required: false },
    currently_working: Boolean,
    employment_type: {
      type: String,
      enum: ["part_time", "full_time", "contract"],
    },
  });

employmentHistorySchema.pre<IEmploymentHistory>(
  "remove",
  async function (next) {
    const freelancer = await Freelancer.findOneAndUpdate(
      { _id: this.freelancer_id },
      { $pull: { employment_history: this._id } }
    );

    if (freelancer) {
      next();
    } else {
      next(new Error("Error updating freelancer"));
    }
  }
);
const EmploymentHistory = mongoose.model<IEmploymentHistory>(
  "EmploymentHistory",
  employmentHistorySchema
);

export default EmploymentHistory;
