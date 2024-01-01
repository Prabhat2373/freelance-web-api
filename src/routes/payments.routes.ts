import {
  addBankDetails,
  sendMoney,
  withdrawMoney,
} from "@/controllers/wallet.controller";
import express from "express";
const paymentsRouter = express.Router();

paymentsRouter.post("/send-money", sendMoney);
// paymentsRouter.get("/transactions/:userId", getTransactions);
// paymentsRouter.post("/withdraw", withdrawMoney);
paymentsRouter.post("/add-bank-details", addBankDetails);

export default paymentsRouter;
