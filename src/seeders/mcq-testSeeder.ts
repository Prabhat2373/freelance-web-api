// import { Test } from "@/models/test.model";
// import Test from "@/models/test.model";
// import testModel from "../models/test";
// import { Test } from "../models/test.model";
import { Test } from "../models/tests.model";
import mongoose from "mongoose";
// import { TestModel } from "./models/TestModel";

// Define the test data
const testsData = [
  {
    name: "Frontend Developer Test",
    description: "Test for evaluating frontend development skills",
    questions: [
      {
        text: 'What is the purpose of the "useEffect" hook in React?',
        options: [
          { name: "To fetch data from the server" },
          {
            name: "To perform side effects in function components",
          },
          { name: "To create a new state variable" },
          { name: "To define a new component" },
        ],
        correctOption: "opt2",
      },
    ],
  },
  {
    name: "Graphics Designer Test",
    description: "Test for evaluating graphics design skills",
    questions: [
      {
        text: "Which software is commonly used for vector graphics design?",
        options: [
          { name: "Adobe Photoshop" },
          { name: "Sketch" },
          { name: "Adobe Illustrator" },
          { name: "CorelDRAW" },
        ],
        correctOption: "opt3",
      },
    ],
  },
];

// Function to seed the tests collection
const testsSeeder = async () => {
  try {
    console.log("Running test seeder..");
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/freelance");

    console.log("deleting test seeder..");
    // Remove any existing data from the tests collection
    await Test.deleteMany({});

    console.log("inserting test seeder..");
    // Insert the tests data into the collection
    await Test.create(testsData);

    console.log("stored test seeder..");
    const storedData = await Test.find({});
    console.log("storedData", storedData);

    // Disconnect from the database
    await mongoose.disconnect();

    console.log("Test seeding completed successfully!");
  } catch (error: any) {
    console.error("Test seeding failed:", error?.message);
  }
};

// Call the seeding function
testsSeeder();
