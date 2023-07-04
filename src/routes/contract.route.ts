import {
  createContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract,
} from "@/controllers/contract.controller";
import express from "express";

const router = express.Router();

router.post("/contracts", createContract);
router.get("/contracts", getAllContracts);
router.get("contracts/:contractId", getContractById);
router.put("contracts/:contractId", updateContract);
router.delete("contracts/:contractId", deleteContract);

export const contractRouter = router;
