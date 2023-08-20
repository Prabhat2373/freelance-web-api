import {
  createEmploymentHistory,
  getEmploymentHistories,
  getEmploymentHistory,
  updateEmploymentHistory,
  deleteEmploymentHistory,
} from "@/controllers/employeement.history.controller";
import express from "express";

const employeementRoutes = express.Router();

employeementRoutes.post("/employment-history", createEmploymentHistory);
employeementRoutes.get("/employment-history", getEmploymentHistories);
employeementRoutes.get("/employment-history/:id", getEmploymentHistory);
employeementRoutes.put("/employment-history/:id", updateEmploymentHistory);
employeementRoutes.delete("/employment-history/:id", deleteEmploymentHistory);

export default employeementRoutes;
