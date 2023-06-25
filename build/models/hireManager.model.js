"use strict";
var mongoose = require("mongoose");
var clientSchema = new mongoose.Schema({
  user_account_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});
var Client = mongoose.model("Client", clientSchema);
module.exports = Client;