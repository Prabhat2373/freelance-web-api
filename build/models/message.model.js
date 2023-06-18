"use strict";
var mongoose = require("mongoose");
var messageSchema = new mongoose.Schema({
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
    message_text: String,
    sent_time: Date,
});
var Message = mongoose.model("Message", messageSchema);
module.exports = Message;
