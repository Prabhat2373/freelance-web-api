import mongoose, { Schema, Document } from "mongoose";

export interface IExpectedDuration extends Document {
  duration: string;
}

const expectedDurationSchema: Schema<IExpectedDuration> =
  new Schema<IExpectedDuration>({
    duration: {
      type: String,
      required: true,
      unique: true,
    },
  });

const ExpectedDuration = mongoose.model<IExpectedDuration>(
  "ExpectedDuration",
  expectedDurationSchema
);

export default ExpectedDuration;
