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
import { sendApiResponse, sendPaginatedApiResponse } from "../utils/utils";
import PaymentType from "@/models/paymentType.model";
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
    // const { skills, experienceLevel } = req.query;

    // // Create a base query to fetch all jobs
    // const baseQuery = Job.find();

    // // Apply filters based on the query parameters
    // if (skills) {
    //   // Split the skills parameter into an array of skill IDs
    //   const skillIds = skills.split(",");
    //   baseQuery.where("required_skills").in(skillIds);
    // }

    // if (experienceLevel) {
    //   baseQuery.where("experience_level").equals(experienceLevel);
    // }

    // // Create an instance of ApiFeatures and apply search and pagination
    // const apiFeature = new ApiFeatures(baseQuery, req.query).search();
    // apiFeature.pagination(resultPerPage);

    const { page, limit, category, search, minPrice, maxPrice, sort } =
      req.query;

    // Convert query parameters to numbers
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    // Define the query conditions based on the category
    const query: any = {};
    if (category) {
      query.category = category;
    }

    // Handle search query
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Handle price range filtering
    if (minPrice && maxPrice) {
      query.price = {
        $gte: parseInt(minPrice as string),
        $lte: parseInt(maxPrice as string),
      };
    } else if (minPrice) {
      query.price = { $gte: parseInt(minPrice as string) };
    } else if (maxPrice) {
      query.price = { $lte: parseInt(maxPrice as string) };
    }

    const options = {
      page: pageNumber,
      limit: limitNumber,
      sort,
      populate: [
        { path: "client_id", model: Client },
        { path: "required_skills", model: Skill },
        { path: "expected_duration_id", model: ExpectedDuration },
        { path: "complexity_id", model: Complexity },
      ],
    };

    // Execute the query and populate related fields
    // const jobs = await apiFeature.query.populate([
    //   { path: "client_id", model: Client },
    //   { path: "required_skills", model: Skill },
    //   { path: "expected_duration_id", model: ExpectedDuration },
    //   { path: "complexity_id", model: Complexity },
    // ]);
    // const jobs = await Job.paginate(query, options);
    const jobs = await Job.paginate(query, options, function (err, result) {
      console.log("RESULT", result);

      const response = {
        ...result,
        data: result.docs,
        docs: undefined,
      };
      return response;
    });
    console.log("JOBS", jobs);

    sendPaginatedApiResponse(res, "success", jobs, "Jobs founded successfully");
  }
);

export const getJobDetails = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const foundedJob = await job.populate([
      { path: "expected_duration_id", model: ExpectedDuration },
      { path: "complexity_id", model: Complexity },
      { path: "payment_type_id", model: PaymentType },
      { path: "experience_level", model: ExperienceLevel },
      { path: "client_id", model: Client },
      { path: "required_skills", model: Skill },
    ]);
    sendApiResponse(res, "success", foundedJob, "Job found successfully");
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

export const saveJob = catchAsyncErrors(
  async (req: RequestType, res: Response) => {
    const jobId = req.params.jobId;
    const freelancer = await Freelancer.updateOne(
      req.user.id,
      {
        savedJobs: [jobId],
      },
      { new: true }
    );
    sendApiResponse(res, "success", freelancer);
  }
);
