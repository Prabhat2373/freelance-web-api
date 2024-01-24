import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Skill from "@/models/skill.model";
import { sendApiResponse } from "@/utils/utils";
import { Request, Response } from "express";

export const getSkills = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const skills = await Skill.find({});
    console.log("skills", skills);

    //   if(!skills)

    return sendApiResponse(res, "success", skills, "Skills Found Successfully");
    //   return skills;
    // return res.status(200).json({
    //   data: skills,
    // });
  }
);

