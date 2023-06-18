const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  hire_manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "HireManager" },
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

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
