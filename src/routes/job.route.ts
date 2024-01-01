import { Router } from "express";
import {
  createNewJob,
  getAllJobListings,
  getJobDetails,
} from "../controllers/job.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = Router();
router.post("/jobs/create", isAuthenticatedUser, createNewJob);
router.get("/jobs", isAuthenticatedUser, getAllJobListings);
router.get("/jobs/:jobId", isAuthenticatedUser, getJobDetails);

export const jobRouter = router;
