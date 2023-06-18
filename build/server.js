"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_connect_1 = __importDefault(require("./config/db.connect"));
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
var PORT = 8001 || process.env.PORT;
// Handling Uncaught Exception
process.on("uncaughtException", function (err) {
    console.log("Error: ".concat(err.message));
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});
var db = "mongodb://127.0.0.1:27017/freelance";
(0, db_connect_1.default)(db);
var server = app_1.default.listen(PORT, function () { return console.log("http://localhost:".concat(PORT)); });
// Unhandled Promise Rejection
process.on("unhandledRejection", function (err) {
    console.log("Error: ".concat(err.message));
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(function () {
        process.exit(1); // for exiting process or closing server
    });
});
