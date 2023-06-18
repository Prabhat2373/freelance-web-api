const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  test_name: String,
  test_link: String,
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;
