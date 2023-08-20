import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import EmploymentHistory from "@/models/employmentHistory.model";
import { sendApiResponse } from "@/utils/utils";
import { Request, Response } from "express";

// @desc    Create a new employment history
// @route   POST /api/employment-history
// @access  Public
export const createEmploymentHistory = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const employmentHistory = await EmploymentHistory.create(req.body);
    sendApiResponse(
      res,
      "success",
      employmentHistory,
      "Employment history created"
    );
  }
);

// @desc    Get all employment histories
// @route   GET /api/employment-history
// @access  Public
export const getEmploymentHistories = catchAsyncErrors(
  async (_req: Request, res: Response) => {
    const employmentHistories = await EmploymentHistory.find();
    sendApiResponse(res, "success", employmentHistories);
  }
);

// @desc    Get a single employment history
// @route   GET /api/employment-history/:id
// @access  Public
export const getEmploymentHistory = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const employmentHistory = await EmploymentHistory.findById(req.params.id);
    if (!employmentHistory) {
      sendApiResponse(res, "error", null, "Employment history not found");
    } else {
      sendApiResponse(res, "success", employmentHistory);
    }
  }
);

// @desc    Update an employment history
// @route   PUT /api/employment-history/:id
// @access  Public
export const updateEmploymentHistory = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const employmentHistory = await EmploymentHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employmentHistory) {
      sendApiResponse(res, "error", null, "Employment history not found");
    } else {
      sendApiResponse(
        res,
        "success",
        employmentHistory,
        "Employment history updated"
      );
    }
  }
);

// @desc    Delete an employment history
// @route   DELETE /api/employment-history/:id
// @access  Public
export const deleteEmploymentHistory = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const employmentHistory = await EmploymentHistory.findByIdAndDelete(
      req.params.id
    );
    if (!employmentHistory) {
      sendApiResponse(res, "error", null, "Employment history not found");
    } else {
      await employmentHistory.remove();
      sendApiResponse(res, "success", null, "Employment history deleted");
    }
  }
);
