import express from "express";
import {
  getAllTests,
  getTestById,
  submitTest,
  getTestResult,
} from "../controllers/test.controller";

const router = express.Router();

router.get("/tests", getAllTests);
router.get("/tests/:id", getTestById);
router.post("/tests/:id/submit", submitTest);
router.get("/tests/:id/result", getTestResult);

export const testRoutes = router;
