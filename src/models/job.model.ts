import mongoose, { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IPaymentMode {
  fixed: string;
  hourly: string;
}

export interface IJob extends Document {
  client_id: mongoose.Types.ObjectId;
  job_title: string;
  job_description: string;
  required_skills: mongoose.Types.ObjectId[];
  expected_duration_id: mongoose.Types.ObjectId;
  complexity_id: mongoose.Types.ObjectId;
  payment_type_id: mongoose.Types.ObjectId;
  payment_amount: number;
  location: string;
  experience_level: mongoose.Types.ObjectId;
  payment_mode: IPaymentMode;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema: Schema<IJob> = new Schema<IJob>({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  job_title: String,
  job_description: String,
  required_skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skills" }],
  expected_duration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpectedDuration",
  },
  complexity_id: { type: mongoose.Schema.Types.ObjectId, ref: "Complexity" },
  payment_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentType" },
  payment_amount: Number,
  location: { type: String },
  experience_level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExperienceLevel",
  },
  payment_mode: {
    fixed: { type: String },
    hourly: { type: String },
  },
  createdAt: { type: Date, default: Date.now() },
});

jobSchema.plugin(mongoosePaginate);
const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
