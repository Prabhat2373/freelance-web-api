import mongoose from "mongoose";
import { ExperienceLevel } from "../models/experience.model";

// Connect to your MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/freelance");

// Define the experience levels to be seeded
const experienceLevels = [
  { name: "Entry level", description: "No prior experience required" },
  { name: "Intermediate", description: "Some experience required" },
  { name: "Advanced", description: "Extensive experience required" },
];

// Function to seed the experience levels
const seedExperienceLevels = async () => {
  try {
    // Delete existing experience levels
    await ExperienceLevel.deleteMany({});

    // Create new experience levels
    await ExperienceLevel.insertMany(experienceLevels);

    console.log("Experience levels seeded successfully");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error seeding experience levels:", error);
    process.exit(1); // Exit the script with an error
  }
};

// Run the seed function
seedExperienceLevels();
