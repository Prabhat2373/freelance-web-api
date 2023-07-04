import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Contract, { IContract } from "@/models/contract.model";
import { sendApiResponse } from "@/utils/utils";

// Create a contract
export const createContract = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      proposal_id,
      company_id,
      freelancer_id,
      start_time,
      end_time,
      payment_type_id,
      payment_amount,
    } = req.body;

    // Create the contract
    const contract: IContract = await Contract.create({
      proposal_id,
      company_id,
      freelancer_id,
      start_time,
      end_time,
      payment_type_id,
      payment_amount,
    });

    sendApiResponse(res, "success", { contract });
  }
);

// Get all contracts
export const getAllContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const contracts: IContract[] = await Contract.find().exec();
    sendApiResponse(res, "success", { contracts });
  }
);

// Get a contract by ID
export const getContractById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { contractId } = req.params;
    const contract: IContract | null = await Contract.findById(
      contractId
    ).exec();

    if (!contract) {
      sendApiResponse(res, "error", "Contract not found");
    } else {
      sendApiResponse(res, "success", { contract });
    }
  }
);

// Update a contract by ID
export const updateContract = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { contractId } = req.params;
    const updateData = req.body;

    const contract: IContract | null = await Contract.findByIdAndUpdate(
      contractId,
      updateData,
      { new: true }
    ).exec();

    if (!contract) {
      sendApiResponse(res, "error", "Contract not found");
    } else {
      sendApiResponse(res, "success", { contract });
    }
  }
);

// Delete a contract by ID
export const deleteContract = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { contractId } = req.params;

    const contract: IContract | null = await Contract.findByIdAndDelete(
      contractId
    ).exec();

    if (!contract) {
      sendApiResponse(res, "error", "Contract not found");
    } else {
      sendApiResponse(res, "success", {
        message: "Contract has been deleted successfully",
      });
    }
  }
);
