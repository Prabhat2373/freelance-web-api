import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  company_name: string;
  company_location: string;
}

const companySchema: Schema<ICompany> = new Schema<ICompany>({
  company_name: String,
  company_location: String,
});

const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;
