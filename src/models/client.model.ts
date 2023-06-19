import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  user_account_id: mongoose.Schema.Types.ObjectId;
  registration_date: Date;
  location: string;
  company_id: mongoose.Schema.Types.ObjectId;
}

const clientSchema: Schema<IClient> = new Schema<IClient>({
  user_account_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: false,
  },
});

const Client = mongoose.model<IClient>("Client", clientSchema);

export default Client;
