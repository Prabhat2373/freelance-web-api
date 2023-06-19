import express from "express";
import {
  loginFreelancer,
  loginClient,
  registerClient,
  registerFreelancer,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/register/freelancer", registerFreelancer);
router.post("/register/client", registerClient);
router.post("/login/freelancer", loginFreelancer);
router.post("/login/hiremanager", loginClient);

export const userRouter = router;
