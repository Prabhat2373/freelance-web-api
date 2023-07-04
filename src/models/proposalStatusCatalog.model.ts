import mongoose, { Schema, Document } from "mongoose";

export interface IProposalStatusCatalog extends Document {
  status_name: string;
}

const ProposalStatusCatalogSchema = new Schema<IProposalStatusCatalog>({
  status_name: { type: String },
});

export const ProposalStatusCatalog = mongoose.model<IProposalStatusCatalog>(
  "ProposalStatusCatalog",
  ProposalStatusCatalogSchema
);
