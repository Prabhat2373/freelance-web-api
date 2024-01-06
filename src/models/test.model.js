"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var mongoose_1 = require("mongoose");
console.log("inside test");
var TestSchema = new mongoose_1.Schema({
    name: Number,
    description: String,
    questions: [
        {
            text: String,
            options: [
                {
                    name: String,
                },
            ],
            correctOption: {
                type: String,
                required: true,
            },
        },
    ],
});
exports.Test = mongoose_1.default.model("Test", TestSchema);
