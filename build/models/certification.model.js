"use strict";
var mongoose = require("mongoose");
var certificationSchema = new mongoose.Schema({
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    certification_name: String,
    provider: String,
    description: String,
    date_earned: Date,
    certification_link: String,
});
var Certification = mongoose.model("Certification", certificationSchema);
module.exports = Certification;
