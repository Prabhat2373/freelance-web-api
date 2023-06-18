"use strict";
var mongoose = require("mongoose");
var complexitySchema = new mongoose.Schema({
    complexity_text: String,
});
var Complexity = mongoose.model("Complexity", complexitySchema);
module.exports = Complexity;
