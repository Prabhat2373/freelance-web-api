import { Request, Response } from "express";
import UserAccount, { IUserAccount } from "../models/account.model";
import Freelancer, { IFreelancer } from "../models/freelancer.model";
import Client, { IClient } from "../models/company.model";
import sendToken from "../utils/jwtToken";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import HireManager, { IHireManager } from "../models/hireManager.model";

export const registerFreelancer = catchAsyncErrors(
  async (req: Request, res: Response) => {
    // Extract freelancer and user account details from request body
    const { username, email, password, ...freelancerDetails } = req.body;

    // Create a new user account
    const userAccount: IUserAccount = new UserAccount({
      username,
      email,
      password,
    });

    // Save the user account to the database
    const savedUserAccount = await userAccount.save();

    // Create a new freelancer with the associated user account
    const freelancer: IFreelancer = new Freelancer({
      user_account_id: savedUserAccount._id,
      ...freelancerDetails,
    });

    // Save the freelancer to the database
    const savedFreelancer = await freelancer.save();
    console.log("saved", savedFreelancer);

    sendToken(savedUserAccount, savedFreelancer, 200, res);
  }
);

export const registerClient = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser: IUserAccount | null = await UserAccount.findOne().or([
      { username },
      { email },
    ]);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new user account
    const userAccount: IUserAccount = new UserAccount({
      username,
      email,
      password,
    });
    await userAccount.save();

    // Create a new client
    const client: IClient = new Client({
      user_account_id: userAccount._id,
      registration_date: new Date(),
      company_name: req.body.company_name,
      location: req.body.location,
    });
    await client.save();

    // res.status(201).json({ message: "Client registered successfully" });
    sendToken(userAccount, client, 201, res);
  }
);

export const registerHireManager = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { user_account_id, registration_date, location, company_id } =
      req.body;

    // Create a new hire manager
    const hireManager: IHireManager = new HireManager({
      user_account_id,
      registration_date,
      location,
      company_id,
    });

    // Save the hire manager to the database
    const savedHireManager = await hireManager.save();

    res.status(201).json(savedHireManager);
    // sendToken()
  }
);
