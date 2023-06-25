import { Request, Response } from "express";
import { Document, Types } from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { IUserAccount, UserRole } from "../models/account.model";
import Client from "../models/client.model";
import Complexity from "../models/complexity.model";
import ExpectedDuration from "../models/expectedDuration.model";
import { ExperienceLevel } from "../models/experience.model";
import Freelancer from "../models/freelancer.model";
import Job from "../models/job.model";
import Skill from "../models/skill.model";
import ApiFeatures from "../utils/ApiFeatures";
import { sendApiResponse } from "../utils/utils";
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
      ...jobdetails
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
      ...jobdetails,
    });

    job.populate([
      { path: "experience_level", model: ExperienceLevel },
      { path: "required_skills", model: Skill },
      { path: "complexity_id", model: Complexity },
    ]);

    sendApiResponse(res, "success", job, "Job created successfully!");
  }
);

export const getAllJobListings = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const resultPerPage = 8;

    const apiFeature = new ApiFeatures(Job.find(), req.query).search().filter();

    apiFeature.pagination(resultPerPage);

    const jobs = await apiFeature.query.populate([
      { path: "client_id", model: Client },
      { path: "required_skills", model: Skill },
      { path: "expected_duration_id", model: ExpectedDuration },
      { path: "complexity_id", model: Complexity },
      // { path: "payment_type_id", model: PaymentType },
    ]);

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

export const getJobDetails = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    sendApiResponse(res, "success", "Job found successfully");
  }
);

export const applyToJob = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const jobId = req.params.jobId;
    const { freelancerId, credentials } = req.body;

    const job = await Job.findById(jobId);
    const freelancer = await Freelancer.findById(freelancerId);

    if (!job || !freelancer) {
      return res.status(404).json({ message: "Job or freelancer not found" });
    }

    // Check if the freelancer meets the job requirements
    if (!freelancer.meetsRequirements(job.requirements)) {
      return res
        .status(400)
        .json({ message: "Freelancer does not meet job requirements" });
    }

    // Perform any additional validation or checks before allowing the freelancer to apply

    // Apply logic here...

    res.status(200).json({ success: true, message: "Application successful" });
  }
);