import mongoose, { Schema, Document } from "mongoose";

export interface IProposal extends Document {
  job_id: mongoose.Types.ObjectId;
  freelancer_id: any;
  proposal_time: Date;
  payment_type_id: mongoose.Types.ObjectId;
  payment_amount: number;
  current_proposal_status: mongoose.Types.ObjectId;
  client_grade?: number | null;
  client_comment?: string | null;
  freelancer_grade?: number | null;
  freelancer_comment?: string | null;
}

const proposalSchema = new Schema<IProposal>({
  job_id: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  freelancer_id: {
    type: Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true,
  },
  proposal_time: { type: Date, required: true },
  payment_type_id: {
    type: Schema.Types.ObjectId,
    ref: "paymentType",
    required: true,
  },
  payment_amount: { type: Number, required: true },
  current_proposal_status: {
    type: Schema.Types.ObjectId,
    ref: "ProposalStatusCatalog",
    required: true,
  },
  client_grade: { type: Number, default: null },
  client_comment: { type: String, default: null },
  freelancer_grade: { type: Number, default: null },
  freelancer_comment: { type: String, default: null },
});

const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;
