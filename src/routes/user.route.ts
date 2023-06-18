import express from "express";
import {
  registerClient,
  registerFreelancer,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/register/freelancer", registerFreelancer);
router.post("/register/client", registerClient);

export const userRouter = router;
