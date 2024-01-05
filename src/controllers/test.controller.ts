import UserAccount from "@/models/account.model";
import { Test } from "@/models/test.model";
import { Request, Response } from "express";

export const getAllTests = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTestById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    if (test) {
      res.json(test);
    } else {
      res.status(404).json({ error: "Test not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const submitTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const user = new UserAccount({ completedTests: [{ testId: id, answers }] });
    await user.save();
    res.json({ message: "Test submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
