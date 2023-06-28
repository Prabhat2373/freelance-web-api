import mongoose, { Schema, Document } from "mongoose";

export interface IFreelancer extends Document {
  user_account: mongoose.Schema.Types.ObjectId;
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
  employment_history: mongoose.Schema.Types.ObjectId[];
  meetsRequirements: (jobRequirements: any) => void;
}

const freelancerSchema: Schema<IFreelancer> = new Schema<IFreelancer>({
  user_account: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  overview: String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  employment_history: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmploymentHistory" },
  ],
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

freelancerSchema.methods.meetsRequirements = function (jobRequirements) {
  // Check if the freelancer's skills match the job requirements
  const freelancerSkills = this.skills.map((skill) => skill.toString());
  const requiredSkills = jobRequirements.map((requirement) =>
    requirement.toString()
  );

  return requiredSkills.every((skill) => freelancerSkills.includes(skill));
};

const Freelancer = mongoose.model<IFreelancer>("Freelancer", freelancerSchema);

export default Freelancer;
