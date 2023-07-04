import mongoose, { Schema, Document } from "mongoose";

export interface IAttachment extends Document {
  message_id: mongoose.Types.ObjectId;
  attachment_link: string;
}

const attachmentSchema = new Schema<IAttachment>({
  message_id: { type: Schema.Types.ObjectId, ref: "Message" },
  attachment_link: String,
});

const Attachment = mongoose.model<IAttachment>("Attachment", attachmentSchema);

export default Attachment;
