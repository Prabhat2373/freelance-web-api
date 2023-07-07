import { Router } from "express";
import {
  createNewJob,
  getAllJobListings,
  getJobDetails,
} from "../controllers/job.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = Router();
router.post("/job/create", isAuthenticatedUser, createNewJob);
router.get("/job/listings", isAuthenticatedUser, getAllJobListings);
router.get("/job/:jobId", isAuthenticatedUser, getJobDetails);

export const jobRouter = router;
