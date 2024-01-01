"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var skillSchema = new mongoose_1.Schema({
    skill_name: String,
});
var Skill = mongoose_1.default.model("Skills", skillSchema);
exports.default = Skill;
