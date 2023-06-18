"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.default.Router();
router.post("/register/freelancer", user_controller_1.registerFreelancer);
router.post("/register/client", user_controller_1.registerClient);
exports.userRouter = router;
