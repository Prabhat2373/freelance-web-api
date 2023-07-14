import mongoose, { Schema, Document } from "mongoose";

export interface IProposal extends Document {
  job: mongoose.Types.ObjectId;
  freelancer_id: any;
  proposal_time: Date;
  // payment_type_id: mongoose.Types.ObjectId;
  // payment_amount: number;
  current_proposal_status: mongoose.Types.ObjectId;
  client_grade?: number | null;
  client_comment?: string | null;
  freelancer_grade?: number | null;
  freelancer_comment?: string | null;
  cover_letter?: string;
}

const proposalSchema = new Schema<IProposal>({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  freelancer_id: {
    type: Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true,
  },
  proposal_time: { type: Date, required: true },

  current_proposal_status: {
    type: Schema.Types.ObjectId,
    ref: "ProposalStatusCatalog",
    required: true,
  },
  client_grade: { type: Number, default: null },
  client_comment: { type: String, default: null },
  freelancer_grade: { type: Number, default: null },
  freelancer_comment: { type: String, default: null },
  cover_letter: { type: String },
});

const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;
