import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import UserAccount from "@/models/account.model";
import { Test } from "../models/tests.model";
import { Request, Response } from "express";
import { sendApiResponse } from "@/utils/utils";
import SubmittedTests from "@/models/submittedTests.model";

export const getAllTests = catchAsyncErrors(
  async (_req: Request, res: Response): Promise<void> => {
    const tests = await Test.find();
    return sendApiResponse(
      res,
      "success",
      tests,
      "All Tests Fetched Successfully"
    );
  }
);

export const getTestById = catchAsyncErrors(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const test = await Test.findById(id);
    if (test) {
      return sendApiResponse(res, "success", test, "Test Fetched Successfully");
    } else {
      res.status(404).json({ error: "Test not found" });
    }
  }
);

export const submitTest = catchAsyncErrors(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { answers } = req.body;

    // const user = new UserAccount({
    //   completedTests: [{ testId: id, answers }],
    // });
    // await user.save();
    const savedTest = await SubmittedTests.create({
      
    })
    return sendApiResponse(res, "success", {}, "Test submitted successfully");
  }
);

export const getTestResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await UserAccount.findOne({ "completedTests.testId": id });
    if (user) {
      const completedTest = user.completedTests.find(
        (test) => test.testId === id
      );
      res.json(completedTest);
    } else {
      res.status(404).json({ error: "Test result not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const seedTests = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const body = req.body;

    console.log("body", body);

    const savedTests = await Test.create({
      name: "test",
      ...body,
    });
    console.log("savedTests", savedTests);

    res.json(savedTests);
  }
);
