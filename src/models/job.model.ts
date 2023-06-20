import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  client_id: mongoose.Types.ObjectId;
  job_title: string;
  job_description: string;
  required_skills: mongoose.Types.ObjectId[];
  expected_duration_id: mongoose.Types.ObjectId;
  complexity_id: mongoose.Types.ObjectId;
  payment_type_id: mongoose.Types.ObjectId;
  payment_amount: number;
}

const jobSchema: Schema<IJob> = new Schema<IJob>({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  job_title: String,
  job_description: String,
  required_skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  expected_duration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpectedDuration",
  },
  complexity_id: { type: mongoose.Schema.Types.ObjectId, ref: "Complexity" },
  payment_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentType" },
  payment_amount: Number,
});

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
