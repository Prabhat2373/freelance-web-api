import { Request, Response } from "express";
import UserAccount, { IUserAccount } from "../models/account.model";
import Freelancer, { IFreelancer } from "../models/freelancer.model";
import Client, { IClient } from "../models/company.model";
import sendToken from "../utils/jwtToken";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

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

export const registerClient = async (req: Request, res: Response) => {
  try {
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

    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the client" });
  }
};
