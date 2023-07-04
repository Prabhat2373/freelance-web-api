import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "@/controllers/company.controller";
import express from "express";

const router = express.Router();

// Create a new company
router.post("/companies", createCompany);

// Get all companies
router.get("/companies", getAllCompanies);

// Get a specific company by ID
router.get("/companies/:companyId", getCompanyById);

// Update a specific company by ID
router.put("/companies/:companyId", updateCompany);

// Delete a specific company by ID
router.delete("/companies/:companyId", deleteCompany);

export const companyRoutes = router;
