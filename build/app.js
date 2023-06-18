"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_route_1 = require("./routes/user.route");
var error_1 = require("./middlewares/error");
// import { ErrorMiddleware } from "./middleware/error";
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/v1", user_route_1.userRouter);
// TEST ONLY
app.get("/", function (req, res) {
    res.status(200).json({
        status: "success",
        message: "connecttion success!",
    });
});
app.get("*", function (req, res) {
    res.status(404).json({
        success: false,
        message: "NO ROUTE FOUND!",
    });
});
app.use(error_1.ErrorMiddleware);
exports.default = app;
