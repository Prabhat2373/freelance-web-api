import mongoose from "mongoose";
import ExpectedDuration from "../models/expectedDuration.model";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/freelance");

// Define the expected duration data
const expectedDurationData = [
  { duration: "Short-term" },
  { duration: "Medium-term" },
  { duration: "Long-term" },
];

// Seed the expected_duration collection
async function seedExpectedDuration() {
  try {
    // Delete existing data in the collection
    await ExpectedDuration.deleteMany();

    // Insert the new data
    await ExpectedDuration.insertMany(expectedDurationData);

    console.log("ExpectedDuration collection seeded successfully.");
  } catch (error) {
    console.error("Error seeding ExpectedDuration collection:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Call the seeding function
seedExpectedDuration();
