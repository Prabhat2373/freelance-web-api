// // import { Test } from "@/models/test.model";
// // import Test from "@/models/test.model";
// // import testModel from "../models/test";
// // import { Test } from "../models/test.model";
// import { Test } from "../models/tests.model";
// import mongoose from "mongoose";
// // import { TestModel } from "./models/TestModel";

// // Define the test data
// const testsData = [
//   {
//     name: "Frontend Developer Test",
//     description: "Test for evaluating frontend development skills",
//     questions: [
//       {
//         text: 'What is the purpose of the "useEffect" hook in React?',
//         options: [
//           { name: "To fetch data from the server" },
//           {
//             name: "To perform side effects in function components",
//           },
//           { name: "To create a new state variable" },
//           { name: "To define a new component" },
//         ],
//         correctOption: "opt2",
//       },
//     ],
//   },
//   {
//     name: "Graphics Designer Test",
//     description: "Test for evaluating graphics design skills",
//     questions: [
//       {
//         text: "Which software is commonly used for vector graphics design?",
//         options: [
//           { name: "Adobe Photoshop" },
//           { name: "Sketch" },
//           { name: "Adobe Illustrator" },
//           { name: "CorelDRAW" },
//         ],
//         correctOption: "opt3",
//       },
//     ],
//   },
// ];

// // Function to seed the tests collection
// const testsSeeder = async () => {
//   try {
//     console.log("Running test seeder..");
//     // Connect to the MongoDB database
//     await mongoose.connect("mongodb://127.0.0.1:27017/freelance");

//     console.log("deleting test seeder..");
//     // Remove any existing data from the tests collection
//     await Test.deleteMany({});

//     console.log("inserting test seeder..");
//     // Insert the tests data into the collection
//     await Test.create(testsData);

//     console.log("stored test seeder..");
//     const storedData = await Test.find({});
//     console.log("storedData", storedData);

//     // Disconnect from the database
//     await mongoose.disconnect();

//     console.log("Test seeding completed successfully!");
//   } catch (error: any) {
//     console.error("Test seeding failed:", error?.message);
//   }
// };

// // Call the seeding function
// testsSeeder();

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
        difficulty: "Medium",
      },
      {
        text: 'In React, what is the significance of the "key" attribute when rendering lists?',
        options: [
          { name: "It defines the order of items in the list" },
          { name: "It uniquely identifies each item in the list" },
          { name: "It specifies the style of each list item" },
          { name: "It determines the type of list to render" },
        ],
        correctOption: "opt2",
        difficulty: "Medium",
      },
      {
        text: 'What is the purpose of the "map" function in JavaScript?',
        options: [
          {
            name: "To create a new array with the results of calling a provided function on every element in the array",
          },
          {
            name: "To filter elements in an array based on a provided condition",
          },
          { name: "To reduce the array to a single value" },
          { name: "To sort the elements of an array" },
        ],
        correctOption: "opt1",
        difficulty: "Easy",
      },
      // Add more questions for the Frontend Developer Test
      // ...
    ],
  },
  {
    name: "Graphics Designer Test",
    description: "Test for evaluating graphics design skills",
    questions: [
      {
        text: "Which software is commonly used for photo editing?",
        options: [
          { name: "Adobe Photoshop" },
          { name: "Sketch" },
          { name: "GIMP" },
          { name: "CorelDRAW" },
        ],
        correctOption: "opt1",
        difficulty: "Easy",
      },
      {
        text: 'What is the purpose of the "pen tool" in graphic design?',
        options: [
          { name: "To draw straight lines" },
          { name: "To create selections" },
          { name: "To paint with colors" },
          { name: "To create vector paths" },
        ],
        correctOption: "opt4",
        difficulty: "Medium",
      },
      {
        text: "Which color mode is used for web graphics?",
        options: [
          { name: "RGB" },
          { name: "CMYK" },
          { name: "Grayscale" },
          { name: "Indexed Color" },
        ],
        correctOption: "opt1",
        difficulty: "Easy",
      },
      // Add more questions for the Graphics Designer Test
      // ...
    ],
  },
  // Add more tests with questions and difficulty levels
  {
    name: "New Test 1",
    description: "Description for New Test 1",
    questions: [
      {
        text: "Question 1 for New Test 1",
        options: [
          { name: "Option 1" },
          { name: "Option 2" },
          { name: "Option 3" },
          { name: "Option 4" },
        ],
        correctOption: "opt1",
        difficulty: "Hard",
      },
      // Add more questions for New Test 1
      // ...
    ],
  },
  {
    name: "New Test 2",
    description: "Description for New Test 2",
    questions: [
      {
        text: "Question 1 for New Test 2",
        options: [
          { name: "Option 1" },
          { name: "Option 2" },
          { name: "Option 3" },
          { name: "Option 4" },
        ],
        correctOption: "opt2",
        difficulty: "Medium",
      },
      // Add more questions for New Test 2
      // ...
    ],
  },
  // ...
];

// Function to seed the tests collection
const testsSeeder = async () => {
  try {
    console.log("Running test seeder..");
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/freelance");

    console.log("Deleting existing test data..");
    // Remove any existing data from the tests collection
    await Test.deleteMany({});

    console.log("Inserting new test data..");
    // Insert the tests data into the collection
    await Test.create(testsData);

    console.log("Fetching stored test data..");
    const storedData = await Test.find({});
    console.log("Stored Data", storedData);

    // Disconnect from the database
    await mongoose.disconnect();

    console.log("Test seeding completed successfully!");
  } catch (error: any) {
    console.error("Test seeding failed:", error?.message);
  }
};

// Call the seeding function
testsSeeder();
