// controllers/razorpayWebhookController.ts
import { Request, Response } from "express";

export const handleRazorpayWebhook = async (req: Request, res: Response) => {
  try {
    // Handle Razorpay webhook payload here
    const { body } = req;

    // Perform necessary actions based on the webhook data
    console.log("Razorpay Webhook Payload:", body);

    return res.status(200).send("Webhook received successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
