"use strict";
var mongoose = require("mongoose");
var contractSchema = new mongoose.Schema({
    proposal_id: Number,
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    start_time: Date,
    end_time: Date,
    payment_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentType" },
    payment_amount: Number,
});
var Contract = mongoose.model("Contract", contractSchema);
module.exports = Contract;
