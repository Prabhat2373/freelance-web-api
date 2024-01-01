// routes/razorpayWebhookRoutes.ts
import { handleRazorpayWebhook } from "@/controllers/razorpay.controller";
import express from "express";
// import { handleRazorpayWebhook } from "../controllers/razorpayWebhookController";

const router = express.Router();

// Endpoint to handle Razorpay webhooks
router.post("/razorpay-webhook", handleRazorpayWebhook);

export default router;
