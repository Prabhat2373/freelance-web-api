"use strict";
var mongoose = require("mongoose");
var hasSkillSchema = new mongoose.Schema({
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
});
var HasSkill = mongoose.model("HasSkill", hasSkillSchema);
module.exports = HasSkill;
