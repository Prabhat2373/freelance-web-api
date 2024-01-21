import { getSkills } from "@/controllers/app.controller";
import { Router } from "express";
const appRouter = Router();

appRouter.get("/skills", getSkills);

export default appRouter;
