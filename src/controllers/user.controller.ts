import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import UserAccount, { IUserAccount, UserRole } from "../models/account.model";
import Client, { IClient } from "../models/client.model";
import Freelancer, { IFreelancer } from "../models/freelancer.model";
import sendToken from "../utils/jwtToken";
import { RequestType } from "./job.controller";
import { sendApiResponse } from "../utils/utils";
import Skill from "../models/skill.model";
import Upload, { uploadSingle } from "@/middlewares/upload";
export const BASE_URL = "http://localhost:8001/api/v1/files/";

export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response) => {
    await Upload(req, res);
    const { username, email, password, role, ...userDetails } = req.body;
    // Create a new user account
    console.log("file", req.files);

    const userAccount: IUserAccount = new UserAccount({
      username,
      email,
      password,
      role,
      avatar:
        req.files && req.files?.length ? BASE_URL + req.files[0].filename : "",
    });
    console.log("userAccount", userAccount);

    // Save the user account to the database
    const savedUserAccount = await userAccount.save();

    let user;
    if (role === UserRole.FREELANCER) {
      // Create a new freelancer with the associated user account
      const freelancer: IFreelancer = new Freelancer({
        user_account: savedUserAccount._id,
        // ...userDetails,
      });

      // Save the freelancer to the database
      user = await freelancer.save();
    } else if (role === UserRole.CLIENT) {
      // Create a new client with the associated user account
      const client: IClient = new Client({
        user_account: savedUserAccount._id,
        // ...userDetails,
      });

      // Save the client to the database
      user = await client.save();
    }

    sendToken(savedUserAccount, user, 200, res);
  }
);

export const updateAccount = catchAsyncErrors(
  async (req: RequestType, res: Response) => {
    const user = req.user;
    console.log("user", user);
    console.log("body", req.body);

    let updatedUser;

    if (user.role === "freelancer") {
      const userId = user ? user._id.toString() : "";
      console.log("userId", userId);

      updatedUser = await Freelancer.findOneAndUpdate(
        { user_account: userId },
        // { title: "TEST" }, // Use the $set operator to update fields dynamically
        { $set: req.body },
        { new: true }
      );
    } else {
      updatedUser = await Client.findByIdAndUpdate(
        user._id,
        // { $set: req.body }, // Use the $set operator to update fields dynamically
        { title: "TEST" },
        { new: true }
      );
    }

    return res.status(200).json({ updatedUser });
  }
);

export const loginUser = catchAsyncErrors(
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

    let user;
    if (userAccount.role === UserRole.FREELANCER) {
      // Find the associated freelancer by user_account
      user = await Freelancer.findOne({
        user_account: userAccount._id,
      }).populate([
        {
          path: "user_account",
          model: UserAccount,
        },
      ]);
    } else if (userAccount.role === UserRole.CLIENT) {
      // Find the associated client by user_account
      user = await Client.findOne({
        user_account: userAccount._id,
      }).populate([
        {
          path: "user_account",
          model: UserAccount,
        },
      ]);
    }

    sendToken(userAccount, user, 200, res);
  }
);

export const getUser = catchAsyncErrors(
  async (req: RequestType, res: Response) => {
    // Find the user account by ID
    console.log("req", req.user);

    const userAccount: IUserAccount | null = await UserAccount.findById(
      req.user._id
    ).select("-password");

    console.log("userAccount", userAccount);

    // If the user account doesn't exist, return an error
    if (!userAccount) {
      return res.status(404).json({ error: "User not found" });
    }

    let user;
    if (userAccount.role === UserRole.FREELANCER) {
      // Find the associated freelancer by user_account
      user = await Freelancer.findOne({
        user_account: userAccount._id,
      })
        .populate([
          {
            path: "skills",
            model: Skill,
          },
          {
            path: "user_account",
            model: UserAccount,
          },
        ])
        .select("-password");
    } else if (userAccount.role === UserRole.CLIENT) {
      // Find the associated client by user_account
      user = await Client.findOne({
        user_account: userAccount._id,
      })
        .populate([
          {
            path: "user_account",
            model: UserAccount,
          },
        ])
        .select("-password");
    }

    if (!user) {
      return res.status(404).json({ error: "User details not found" });
    }

    res.status(200).json({ success: true, user });
  }
);
