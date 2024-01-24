import mongoose from "mongoose";
import Complexity from "../models/complexity.model";
import PaymentType from "../models/paymentType.model";

const paymentTypeSeeder = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/freelance");

  const db = mongoose.connection;
  try {
    db.once("open", () => {
      console.log("Connected to the database.");
    });

    // Define the complexity data
    const data = [{ type: "hourly" }, { type: "fixed" }];
    await PaymentType.deleteMany({});
    // Insert the complexity data into the database
    await PaymentType.insertMany(data);

    console.log("Payment Types seeded successfully.");
  } catch (error) {
    console.error("Error seeding Payment Types:", error);
  } finally {
    // Close the database connection
    db.close();
  }
};

paymentTypeSeeder();
