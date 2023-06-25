import mongoose, { Schema, Document } from "mongoose";
export interface IPaymentType extends Document {
  type_name: string;
}

const paymentTypeSchema: Schema<IPaymentType> = new Schema<IPaymentType>({
  type_name: String,
});

const PaymentType = mongoose.model("paymentType", paymentTypeSchema);
export default PaymentType;
