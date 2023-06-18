const mongoose = require("mongoose");

const hasSkillSchema = new mongoose.Schema({
  freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
  skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
});

const HasSkill = mongoose.model("HasSkill", hasSkillSchema);

module.exports = HasSkill;
