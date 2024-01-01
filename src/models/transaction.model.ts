// models/transaction.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  senderId: string;
  receiverId: string;
  amount: number;
  date: Date;
}

const transactionSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
