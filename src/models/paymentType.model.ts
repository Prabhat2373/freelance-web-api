import mongoose, { Schema, Document } from "mongoose";
export interface IPaymentType extends Document {
  type: string;
}

const paymentTypeSchema: Schema<IPaymentType> = new Schema<IPaymentType>({
  type: String,
});

const PaymentType = mongoose.model("paymentType", paymentTypeSchema);
export default PaymentType;
