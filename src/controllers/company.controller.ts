import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Company, { ICompany } from "@/models/company.model";
import { sendApiResponse } from "@/utils/utils";

// Create a new company
export const createCompany = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { company_name, company_location } = req.body;

    const company: ICompany = await Company.create({
      company_name,
      company_location,
    });

    sendApiResponse(res, "success", company);
  }
);

// Get all companies
export const getAllCompanies = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const companies: ICompany[] = await Company.find().exec();

    sendApiResponse(res, "success", companies);
  }
);

// Get a specific company by ID
export const getCompanyById = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;

    const company: ICompany | null = await Company.findById(companyId).exec();

    if (!company) {
      return sendApiResponse(res, "error", null, "Company not found");
    }

    sendApiResponse(res, "success", company);
  }
);

// Update a specific company by ID
export const updateCompany = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const updateData = req.body;

    const company: ICompany | null = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true }
    ).exec();

    if (!company) {
      return sendApiResponse(res, "error", null, "Company not found");
    }

    sendApiResponse(res, "success", company);
  }
);

// Delete a specific company by ID
export const deleteCompany = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;

    const company: ICompany | null = await Company.findByIdAndDelete(
      companyId
    ).exec();

    if (!company) {
      return sendApiResponse(res, "error", null, "Company not found");
    }

    sendApiResponse(res, "success", null, "Company deleted successfully");
  }
);
