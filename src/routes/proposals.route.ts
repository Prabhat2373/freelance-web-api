import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposalById,
  withdrawProposal,
} from "@/controllers/proposals.controller";
import express from "express";

const router = express.Router();

router.post("/proposals", createProposal);
router.get("/proposals", getAllProposals);
router.get("/proposals/:proposalId", getProposalById);
router.put("/proposals/:proposalId", updateProposalById);
router.put("/proposals/:proposalId/withdraw", withdrawProposal);

export const proposalRouter =  router;
