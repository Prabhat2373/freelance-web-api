"use strict";
var mongoose = require("mongoose");
var attachmentSchema = new mongoose.Schema({
    message_id: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    attachment_link: String,
});
var Attachment = mongoose.model("Attachment", attachmentSchema);
module.exports = Attachment;
