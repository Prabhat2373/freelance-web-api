import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import UserAccount, { IUserAccount, UserRole } from "../models/account.model";
import Client, { IClient } from "../models/client.model";
import Freelancer, { IFreelancer } from "../models/freelancer.model";
import sendToken from "../utils/jwtToken";

export const registerFreelancer = catchAsyncErrors(
  async (req: Request, res: Response) => {
    // Extract freelancer and user account details from request body
    const { username, email, password, ...freelancerDetails } = req.body;

    // Create a new user account
    const userAccount: IUserAccount = new UserAccount({
      username,
      email,
      password,
      role: UserRole.FREELANCER,
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

export const loginFreelancer = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find the user account by email
    const userAccount: IUserAccount | null = await UserAccount.findOne({
      email,
    });

    // If the user account doesn't exist, return an error
    if (!userAccount) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await userAccount.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Find the associated freelancer by user_account_id
    const freelancer: IFreelancer | null = await Freelancer.findOne({
      user_account_id: userAccount._id,
    });

    sendToken(userAccount, freelancer, 200, res);
  }
);

export const registerClient = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { username, email, password, ...clientDetails } = req.body;

    // Create a new user account
    const userAccount = new UserAccount({
      username,
      email,
      password,
      role: UserRole.CLIENT,
    });

    // Save the user account to the database
    const savedUserAccount = await userAccount.save();

    // Create a new client with the associated user account
    const client = new Client({
      user_account_id: savedUserAccount._id,
      ...clientDetails,
    });

    // Save the client to the database
    const savedClient = await client.save();

    sendToken(userAccount, savedClient, 201, res);
  }
);

export const loginClient = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userAccount: IUserAccount | null = await UserAccount.findOne({
      email,
    });

    // If the user account doesn't exist, return an error
    if (!userAccount) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await userAccount.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Find the associated hire manager by user_account_id
    const client: IClient | null = await Client.findOne({
      user_account_id: userAccount._id,
    });
    sendToken(userAccount, client, 200, res);
  }
);
