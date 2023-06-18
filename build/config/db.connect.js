"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (db) {
    var connect = function () {
        mongoose_1.default
            .connect(db)
            .then(function () {
            console.info("Successfully connected to ".concat(db));
        })
            .catch(function (err) {
            console.error("Error connecting to database: ".concat(err));
            throw err;
        });
    };
    connect();
    mongoose_1.default.connection.on("error", function (err) {
        console.error("Database error: ".concat(err));
        throw err;
    });
    mongoose_1.default.connection.on("disconnected", function () {
        console.warn("Lost database connection. Retrying...");
        connect();
    });
});
