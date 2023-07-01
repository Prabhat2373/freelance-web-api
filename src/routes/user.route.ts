import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login/freelancer", loginUser);
router.post("/login", loginUser);

router.get("/account", isAuthenticatedUser, getUser);

// router.post("/register/client", registerClient);
// router.post("/login/client", loginClient);

export const userRouter = router;
