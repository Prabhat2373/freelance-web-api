import express from "express";
import {
  loginFreelancer,
  loginClient,
  registerClient,
  registerFreelancer,
  getFreelancer,
  loginUser,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = express.Router();

router.post("/register/freelancer", registerFreelancer);
router.post("/login/freelancer", loginFreelancer);
router.post("/login", loginUser);

router.get("/account/freelancer", isAuthenticatedUser, getFreelancer);

router.post("/register/client", registerClient);
router.post("/login/client", loginClient);

export const userRouter = router;
