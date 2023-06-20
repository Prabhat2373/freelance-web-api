import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { IUserAccount, UserRole } from "../models/account.model";
import { Document, Types } from "mongoose";
import Job from "../models/job.model";
import { sendApiResponse } from "../utils/utils";
import ApiFeatures from "../utils/ApiFeatures";

export interface RequestType extends Request {
  cookies: {
    token: string;
  };
  user: (Document & Omit<IUserAccount & { _id: Types.ObjectId }, "_id">) | null;
}

export const createNewJob = catchAsyncErrors(
  async (req: RequestType, res: Response) => {
    const {
      hire_manager_id,
      job_title,
      job_description,
      required_skills,
      expected_duration_id,
      complexity_id,
      payment_type_id,
      payment_amount,
    } = req.body;
    const user = req.user; // Assuming you have middleware to authenticate the user
    if (user && user.role !== UserRole.CLIENT) {
      return res.status(403).json({ error: "Only clients can create jobs" });
    }

    const job = await Job.create({
      hire_manager_id,
      job_title,
      job_description,
      required_skills,
      expected_duration_id,
      complexity_id,
      payment_type_id,
      payment_amount,
    });

    sendApiResponse(res, "success", job, "Job created successfully!");
  }
);

export const getAllJobListings = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(Job.find(), req.query).search().filter();

    apiFeature.pagination(resultPerPage);

    const jobs = await apiFeature.query;

    const productsCount = await Job.countDocuments();
    const filteredProductsCount = jobs.length;

    res.status(200).json({
      success: true,
      jobs,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  }
);
