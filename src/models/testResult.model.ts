const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  freelancer_id: { type: Number, required: true },
  test_id: { type: Number, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, default: null },
  test_result_link: { type: String, default: null },
  score: { type: Number, default: null },
  display_on_profile: { type: Boolean, default: null },
});

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = TestResult;
