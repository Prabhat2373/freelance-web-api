"use strict";
var mongoose = require("mongoose");
var testSchema = new mongoose.Schema({
    test_name: String,
    test_link: String,
});
var Test = mongoose.model("test", testSchema);
module.exports = Test;
