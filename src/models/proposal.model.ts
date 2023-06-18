const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  job_id: { type: Number, required: true },
  freelancer_id: { type: Number, required: true },
  proposal_time: { type: Date, required: true },
  payment_type_id: { type: Number, required: true },
  payment_amount: { type: Number, required: true },
  current_proposal_status: { type: Number, required: true },
  client_grade: { type: Number, default: null },
  client_comment: { type: String, default: null },
  freelancer_grade: { type: Number, default: null },
  freelancer_comment: { type: String, default: null },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
