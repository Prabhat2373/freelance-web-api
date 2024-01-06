"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Test } from "@/models/test.model";
// import Test from "@/models/test.model";
// import testModel from "../models/test";
var test_model_1 = require("../models/test.model");
var mongoose_1 = require("mongoose");
// import { TestModel } from "./models/TestModel";
// Define the test data
var testsData = [
    {
        name: "Frontend Developer Test",
        description: "Test for evaluating frontend development skills",
        questions: [
            {
                text: 'What is the purpose of the "useEffect" hook in React?',
                options: [
                    { name: "To fetch data from the server" },
                    //   {
                    //     name: "To perform side effects in function components",
                    //   },
                    //   { name: "To create a new state variable" },
                    //   { name: "To define a new component" },
                ],
                correctOption: "opt2",
            },
        ],
    },
    //   {
    //     name: "Graphics Designer Test",
    //     description: "Test for evaluating graphics design skills",
    //     questions: [
    //       {
    //         text: "Which software is commonly used for vector graphics design?",
    //         // options: [
    //         //   { name: "Adobe Photoshop" },
    //         //   { name: "Sketch" },
    //         //   { name: "Adobe Illustrator" },
    //         //   { name: "CorelDRAW" },
    //         // ],
    //         correctOption: "opt3",
    //       },
    //     ],
    //   },
];
// Function to seed the tests collection
var testsSeeder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var storedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log("Running test seeder..");
                // Connect to the MongoDB database
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://127.0.0.1:27017/freelance")];
            case 1:
                // Connect to the MongoDB database
                _a.sent();
                console.log("deleting test seeder..");
                // Remove any existing data from the tests collection
                return [4 /*yield*/, test_model_1.Test.deleteMany({})];
            case 2:
                // Remove any existing data from the tests collection
                _a.sent();
                console.log("inserting test seeder..");
                // Insert the tests data into the collection
                return [4 /*yield*/, test_model_1.Test.insertMany(testsData)];
            case 3:
                // Insert the tests data into the collection
                _a.sent();
                console.log("stored test seeder..");
                return [4 /*yield*/, test_model_1.Test.find({})];
            case 4:
                storedData = _a.sent();
                console.log("storedData", storedData);
                // Disconnect from the database
                return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                // Disconnect from the database
                _a.sent();
                console.log("Test seeding completed successfully!");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Test seeding failed:", error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Call the seeding function
testsSeeder();
