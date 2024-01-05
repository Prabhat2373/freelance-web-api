import Razorpay from "razorpay";
import { Request, Response } from "express";
import Wallet from "@/models/wallet.model";
import Transaction from "@/models/transaction.model";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

const razorpay = new Razorpay({
  key_id: "rzp_test_8svWfAxaOc8MjE",
  key_secret: "0Hkft10YNZnMwhFaDX8XnFAq",
});

export const sendMoney = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { senderId, receiverId, amount } = req.body;

    const senderWallet = await Wallet.findOne({ userId: senderId });
    const receiverWallet = await Wallet.findOne({ userId: receiverId });

    if (!senderWallet || !receiverWallet) {
      return res
        .status(404)
        .json({ message: "Sender or receiver wallet not found" });
    }

    // Check if the sender has sufficient balance
    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    console.log("Sending money");
    let paymentLink;
    // Create a Razorpay payment link
    await razorpay.invoices
      .create({
        amount,
        currency: "INR", // Adjust based on your currency
        receipt: `transaction_${Date.now()}`,
        description: "Test transaction",
        // payment_capture: "1",
        type: "link",
        line_items: [],
        notes: {
          senderId,
          receiverId,
        },
      })
      .then((res) => {
        console.log("money sent", res);
        paymentLink = res?.short_url;
      })
      .catch((err) => {
        console.log("error sending money", err);
      });
    console.log("razorpay exected");

    console.log("paymentLink", paymentLink);

    // Deduct the amount from the sender's balance
    senderWallet.balance -= amount;
    await senderWallet.save();

    // Record the transaction
    const transaction = new Transaction({ senderId, receiverId, amount });
    await transaction.save();

    // Update wallet references
    senderWallet.transactions.push(transaction._id);
    await senderWallet.save();

    return res.status(200).json({ paymentLink });
  }
);

export const addBankDetails = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { userId, bankDetails } = req.body;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0 });
    }

    // Update bank details with Razorpay
    const updateBankDetails = await razorpay.fundAccounts.create({
      account_number: bankDetails.accountNumber,
      contact: {
        name: bankDetails.accountHolderName,
        email: "prabhat@gmail.com", // Update with the user's email
      },
    });

    // Handle the Razorpay fund account creation response
    if (updateBankDetails.id) {
      // Update bank details in the wallet
      wallet.bankDetails = bankDetails;
      await wallet.save();

      return res
        .status(200)
        .json({ message: "Bank details added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add bank details" });
    }
  }
);

export const withdrawMoney = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0 });
    }

    // Check if the user has sufficient balance
    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Create a Razorpay withdrawal request
    const withdrawalRequest = await razorpay.withdrawals.create({
      account_number: wallet.bankDetails.accountNumber,
      fund_account: "fund_account_id", // Obtain this from your Razorpay Dashboard
      amount,
      currency: "INR", // Adjust based on your currency
    });

    // Handle the Razorpay withdrawal response
    if (withdrawalRequest.status === "created") {
      // Deduct the amount from the user's balance
      wallet.balance -= amount;
      await wallet.save();

      // Record the withdrawal transaction
      const withdrawalTransaction = new Transaction({
        senderId: userId,
        amount: -amount,
      });
      await withdrawalTransaction.save();

      // Update wallet references
      wallet.transactions.push(withdrawalTransaction._id);
      await wallet.save();

      return res.status(200).json({ message: "Withdrawal successful" });
    } else {
      return res.status(500).json({ message: "Failed to initiate withdrawal" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
