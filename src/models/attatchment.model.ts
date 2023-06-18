const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  message_id: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  attachment_link: String,
});

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
