import { Router } from "express";
import { createNewJob, getAllJobListings } from "../controllers/job.controller";
import { isAuthenticatedUser } from "../middlewares/Auth";
const router = Router();
router.post("/job/create", isAuthenticatedUser, createNewJob);
router.get("/job/listings", isAuthenticatedUser, getAllJobListings);

export const jobRouter = router;
