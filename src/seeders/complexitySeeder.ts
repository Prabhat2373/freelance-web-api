import mongoose from "mongoose";
import Complexity from "../models/complexity.model";

const seedComplexities = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/freelance");

  const db = mongoose.connection;
  try {
    db.once("open", () => {
      console.log("Connected to the database.");
    });

    // Define the complexity data
    const complexityData = [
      { complexity_text: "Low" },
      { complexity_text: "Medium" },
      { complexity_text: "High" },
    ];
    await Complexity.deleteMany({});
    // Insert the complexity data into the database
    await Complexity.insertMany(complexityData);

    console.log("Complexities seeded successfully.");
  } catch (error) {
    console.error("Error seeding complexities:", error);
  } finally {
    // Close the database connection
    db.close();
  }
};

seedComplexities();
