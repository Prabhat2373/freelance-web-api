// models/wallet.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBankDetails {
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
  // Add other necessary details
}

export interface IWallet extends Document {
  userId: string;
  balance: number;
  transactions: mongoose.Types.ObjectId[];
  bankDetails?: IBankDetails;
}

const walletSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  bankDetails: {
    accountNumber: { type: String },
    accountHolderName: { type: String },
    bankName: { type: String },
    // Add other necessary details
  },
});

export default mongoose.model<IWallet>('Wallet', walletSchema);
