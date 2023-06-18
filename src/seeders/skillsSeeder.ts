import mongoose from "mongoose";
import Skill from "../models/skill.model";
// import Skill from "./skillModel";

// Define the skill data
const skillsData = [
  { skill_name: "Skill 1" },
  { skill_name: "Skill 2" },
  { skill_name: "Skill 3" },
  // Add more skills as needed
];

// Function to seed the skills collection
const seedSkills = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://localhost:27017/freelance", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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

// Call the seeding function
seedSkills();
