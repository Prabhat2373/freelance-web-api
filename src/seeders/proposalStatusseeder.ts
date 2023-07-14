import { ProposalStatusCatalog } from "../models/proposalStatusCatalog.model";
import mongoose from "mongoose";

const proposalStatuses = [
  { status_name: "Pending" },
  { status_name: "Accepted" },
  { status_name: "Rejected" },
];

const seedProposalStatusCatalog = async () => {
  try {
    // Clear existing data
    await ProposalStatusCatalog.deleteMany({});

    // Seed the data
    await ProposalStatusCatalog.insertMany(proposalStatuses);

    console.log("ProposalStatusCatalog seeding completed!");
    process.exit(0); // Exit the process after seeding is complete
  } catch (error) {
    console.error("ProposalStatusCatalog seeding failed:", error);
    process.exit(1); // Exit the process with an error code if seeding fails
  }
};

// Connect to the MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/freelance")
  .then(() => {
    // Call the seeder function
    seedProposalStatusCatalog();
  })
  .catch((error: any) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with an error code if the database connection fails
  });
