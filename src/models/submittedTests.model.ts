import mongoose, { Schema } from "mongoose";

export const SubmittedTestsSchema = new Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedOption: String,
    },
  ],
});

const SubmittedTests = mongoose.model("SubmittedTests", SubmittedTestsSchema);
export default SubmittedTests;
