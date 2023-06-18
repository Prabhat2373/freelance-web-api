const mongoose = require("mongoose");

const hireManagerSchema = new mongoose.Schema({
  user_account_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
  registration_date: Date,
  location: String,
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const HireManager = mongoose.model("HireManager", hireManagerSchema);

module.exports = HireManager;
