import mongoose, { Schema, Document } from "mongoose";

interface IProposal extends Document {
  job_id: number;
  freelancer_id: any;
  proposal_time: Date;
  payment_type_id: number;
  payment_amount: number;
  current_proposal_status: number;
  client_grade?: number | null;
  client_comment?: string | null;
  freelancer_grade?: number | null;
  freelancer_comment?: string | null;
}

const proposalSchema = new Schema<IProposal>({
  job_id: { type: Number, required: true },
  freelancer_id: {
    type: Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true,
  },
  proposal_time: { type: Date, required: true },
  payment_type_id: { type: Number, required: true },
  payment_amount: { type: Number, required: true },
  current_proposal_status: { type: Number, required: true },
  client_grade: { type: Number, default: null },
  client_comment: { type: String, default: null },
  freelancer_grade: { type: Number, default: null },
  freelancer_comment: { type: String, default: null },
});

const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;
