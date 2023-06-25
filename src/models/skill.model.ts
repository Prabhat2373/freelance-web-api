import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  skill_name: string;
}

const skillSchema: Schema = new Schema({
  skill_name: String,
});

const Skill = mongoose.model<ISkill>("Skills", skillSchema);

export default Skill;
