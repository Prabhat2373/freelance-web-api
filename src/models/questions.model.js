"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = exports.QuestionSchema = void 0;
var mongoose_1 = require("mongoose");
var questionOptionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
exports.QuestionSchema = new mongoose_1.Schema({
    text: String,
    // options: [questionOptionSchema],
    // options: [{ type: [{ name: String }], required: true }],
    // options: [{ type: String, required: true }],
    // options: { type: Number, required: true },
    options: [questionOptionSchema],
    correctOption: String,
});
console.log("QuestionSchema", exports.QuestionSchema);
exports.Question = mongoose_1.default.model("Question", exports.QuestionSchema);
