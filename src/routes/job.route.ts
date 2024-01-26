import { Router } from "express";
import {
  createNewJob,
  getAllJobListings,
  getComplexities,
  getExpectedDurations,
  getExperienceLevels,
  getJobDetails,
  getPaymentTypes,
} from "../controllers/job.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = Router();
router.post("/jobs/create", isAuthenticatedUser, createNewJob);
router.get("/jobs", isAuthenticatedUser, getAllJobListings);
router.get("/jobs/:jobId", isAuthenticatedUser, getJobDetails);
router.get("/exected-durations", getExpectedDurations);
router.get("/complexities", getComplexities);
router.get("/payment-types", getPaymentTypes);
router.get("/experience-levels", getExperienceLevels);

export const jobRouter = router;
