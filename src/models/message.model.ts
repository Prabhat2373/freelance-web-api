const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  message_text: String,
  sent_time: Date,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
