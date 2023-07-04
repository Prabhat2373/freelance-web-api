import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Proposal, { IProposal } from "@/models/proposal.model";
import { sendApiResponse } from "@/utils/utils";
import { NextFunction, Request, Response } from "express";

export const createProposal = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id, freelancer_id, payment_type_id, payment_amount } =
        req.body;

      // Create the proposal
      const proposal: IProposal = await Proposal.create({
        job_id,
        freelancer_id,
        proposal_time: new Date(),
        payment_type_id,
        payment_amount,
        current_proposal_status: 1, // Assuming 1 represents the initial status
      });

      sendApiResponse(res, "success", { proposal });
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const getAllProposals = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proposals: IProposal[] = await Proposal.find().exec();
      sendApiResponse(res, "success", { proposals });
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const getProposalById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;
      const proposal: IProposal | null = await Proposal.findById(
        proposalId
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", { proposal });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const updateProposalById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;
      const updateData = req.body;

      const proposal: IProposal | null = await Proposal.findByIdAndUpdate(
        proposalId,
        updateData,
        { new: true }
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", { proposal });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const withdrawProposal = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;

      const proposal: IProposal | null = await Proposal.findByIdAndUpdate(
        proposalId,
        { current_proposal_status: 0 }, // Assuming 0 represents the withdrawn status
        { new: true }
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", {
          message: "Proposal has been withdrawn successfully",
        });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);
