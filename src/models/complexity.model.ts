const mongoose = require("mongoose");

const complexitySchema = new mongoose.Schema({
  complexity_text: String,
});

const Complexity = mongoose.model("Complexity", complexitySchema);

module.exports = Complexity;
