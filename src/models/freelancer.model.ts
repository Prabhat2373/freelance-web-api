import mongoose, { Schema, Document } from "mongoose";

export interface IFreelancer extends Document {
  user_account_id: mongoose.Schema.Types.ObjectId;
  registration_date: Date;
  location: string;
  overview: string;
  skills: mongoose.Schema.Types.ObjectId[];
  language: string;
  country: string;
  title: string;
  experience: string;
  education: string;
  description: string;
  hourly_rate: number;
  address: string;
  phone: string;
}

const freelancerSchema: Schema<IFreelancer> = new Schema<IFreelancer>({
  user_account_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  overview: String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  language: String,
  country: String,
  title: String,
  experience: String,
  education: String,
  description: String,
  hourly_rate: Number,
  address: String,
  phone: String,
});

const Freelancer = mongoose.model<IFreelancer>("Freelancer", freelancerSchema);

export default Freelancer;
