import Upload from "@/middlewares/upload";
import EmploymentHistory from "@/models/employmentHistory.model";
import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import UserAccount, { IUserAccount, UserRole } from "../models/account.model";
import Client, { IClient } from "../models/client.model";
import Freelancer, { IFreelancer } from "../models/freelancer.model";
import Skill from "../models/skill.model";
import sendToken from "../utils/jwtToken";
import { sendApiResponse } from "../utils/utils";
import { RequestType } from "./job.controller";
import walletModel from "@/models/wallet.model";
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

    const wallet = await walletModel.create({
      userId: savedUserAccount._id,
      balance: 0,
    });
    console.log("wallet", wallet);

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

    // await savedUserAccount.populate([
    //   {
    //     path: "user_account",
    //     model: UserAccount,
    //   },
    // ]);
    await user.populate([
      {
        path: "user_account",
        model: UserAccount,
      },
    ]);

    sendToken(savedUserAccount, user, 200, res);
  }
);

// export const updateAccount = catchAsyncErrors(
//   async (req: RequestType, res: Response) => {
//     const user = req.user;
//     console.log("user", user);
//     console.log("body", req.body);

//     let updatedUser;

//     if (user.role === "freelancer") {
//       const userId = user ? user._id.toString() : "";

//       if (req.body.employment_history) {
//         const employmentHistoryIds = [];

//         for (const history of req.body.employment_history) {
//           const employmentHistory = await EmploymentHistory.create({
//             freelancer_id: user._id,
//             ...history,
//           });

//           employmentHistoryIds.push(employmentHistory._id);
//         }

//         updatedUser = await Freelancer.findOneAndUpdate(
//           { user_account: userId },
//           { $push: { employment_history: { $each: employmentHistoryIds } } },
//           { new: true }
//         );
//       } else {
//         updatedUser = await Freelancer.findOneAndUpdate(
//           { user_account: userId },
//           { $set: req.body },
//           { new: true }
//         );
//       }
//     } else {
//       updatedUser = await Client.findByIdAndUpdate(
//         user._id,
//         { $set: req.body }, // Use the $set operator to update fields dynamically
//         // { title: "TEST" },
//         { new: true }
//       );
//     }

//     return sendApiResponse(res, "success", user, "User Updated Successfully");
//   }
// );

export const updateAccount = catchAsyncErrors(
  async (req: RequestType, res: Response) => {
    const user = req.user;
    console.log("user", user);
    console.log("body", req.body);

    let updatedUser;

    if (user.role === "freelancer") {
      const userId = user ? user._id.toString() : "";

      if (req.body.employment_history) {
        const employmentHistoryUpdates = req.body.employment_history.map(
          async (history) => {
            if (history._id) {
              // If the employment history entry has an _id, update it
              return EmploymentHistory.findOneAndUpdate(
                { _id: history._id },
                { $set: history },
                { new: true }
              );
            } else {
              // Otherwise, create a new employment history entry
              const employmentHistory = await EmploymentHistory.create({
                freelancer_id: user._id,
                ...history,
              });
              return employmentHistory;
            }
          }
        );

        const updatedEmploymentHistories = await Promise.all(
          employmentHistoryUpdates
        );
        const employmentHistoryIds = updatedEmploymentHistories.map(
          (history) => history._id
        );

        updatedUser = await Freelancer.findOneAndUpdate(
          { user_account: userId },
          { $set: { employment_history: employmentHistoryIds } },
          { new: true }
        );
      } else {
        updatedUser = await Freelancer.findOneAndUpdate(
          { user_account: userId },
          { $set: req.body },
          { new: true }
        );
      }
    } else {
      updatedUser = await Client.findByIdAndUpdate(
        user._id,
        { $set: req.body }, // Use the $set operator to update fields dynamically
        { new: true }
      );
    }

    return sendApiResponse(res, "success", user, "User Updated Successfully");
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
          {
            path: "employment_history",
            model: EmploymentHistory,
          },
        ])
        .select("-password -__v");
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
        .select("-password -__v");
    }

    if (!user) {
      return res.status(404).json({ error: "User details not found" });
    }

    return sendApiResponse(res, "success", user, "User Found Successfully");
  }
);
