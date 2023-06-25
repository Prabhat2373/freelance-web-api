import mongoose, { Schema, Document } from "mongoose";

interface IContract extends Document {
  proposal_id: mongoose.Types.ObjectId;
  company_id: mongoose.Types.ObjectId;
  freelancer_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  payment_type_id: mongoose.Types.ObjectId;
  payment_amount: number;
}

const contractSchema = new Schema<IContract>({
  proposal_id: { type: Schema.Types.ObjectId, ref: "Proposal", required: true },
  company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  freelancer_id: {
    type: Schema.Types.ObjectId,
    ref: "Freelancer",
  required: true,
  },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  payment_type_id: {
    type: Schema.Types.ObjectId,
    ref: "PaymentType",
    required: true,
  },
  payment_amount: { type: Number, required: true },
});

const Contract = mongoose.model<IContract>("Contract", contractSchema);

export default Contract;
