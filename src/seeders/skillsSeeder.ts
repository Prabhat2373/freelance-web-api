import mongoose from "mongoose";
import Skill from "../models/skill.model";

// Define the skill data
const skillsData = [
  { skill_name: "Skill 1" },
  { skill_name: "Skill 2" },
  { skill_name: "Skill 3" },
];

// Function to seed the skills collection
const seedSkills = async () => {
  try {
    console.log("running..");
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/freelance");

    // Remove any existing data from the skills collection
    await Skill.deleteMany({});

    // Insert the skills data into the collection
    await Skill.insertMany(skillsData);

    // Disconnect from the database
    await mongoose.disconnect();

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

// // Call the seeding function
seedSkills();

export default seedSkills;
