import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import { Request, Response } from "express";

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_9Fz6vX0ehGAuCA",
  key_secret: "YOUR_KEY_SECRET",
});

export const addBankAccount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    // Validate and store bank account details securely (follow PCI DSS standards)
    const { userId, accountNumber, ifscCode } = req.body;

    const razorpayAccount = await razorpay.accounts.create({
      contact: "test",
      type: "bank_account",
    });

    
    // Store the details securely in your database
    // ...
    res.status(201).json({ message: "Bank account added successfully" });
  }
);
