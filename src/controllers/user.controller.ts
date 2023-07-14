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
// export const registerFreelancer = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     // Extract freelancer and user account details from request body
//     const { username, email, password, ...freelancerDetails } = req.body;

//     // Create a new user account
//     const userAccount: IUserAccount = new UserAccount({
//       username,
//       email,
//       password,
//       role: UserRole.FREELANCER,
//     });

//     // Save the user account to the database
//     const savedUserAccount = await userAccount.save();

//     // Create a new freelancer with the associated user account
//     const freelancer: IFreelancer = new Freelancer({
//       user_account: savedUserAccount._id,
//       ...freelancerDetails,
//     });

//     // Save the freelancer to the database
//     const savedFreelancer = await freelancer.save();
//     console.log("saved", savedFreelancer);

//     sendToken(savedUserAccount, savedFreelancer, 200, res);
//   }
// );

// export const loginFreelancer = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     // Find the user account by email
//     const userAccount: IUserAccount | null = await UserAccount.findOne({
//       email,
//     });

//     // If the user account doesn't exist, return an error
//     if (!userAccount) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Check if the password matches
//     const isMatch = await userAccount.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Find the associated freelancer by user_account
//     const freelancer: IFreelancer | null = await Freelancer.findOne({
//       user_account: userAccount._id,
//     });

//     sendToken(userAccount, freelancer, 200, res);
//   }
// );

// export const registerClient = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     const { username, email, password, ...clientDetails } = req.body;

//     // Create a new user account
//     const userAccount = new UserAccount({
//       username,
//       email,
//       password,
//       role: UserRole.CLIENT,
//     });

//     // Save the user account to the database
//     const savedUserAccount = await userAccount.save();

//     // Create a new client with the associated user account
//     const client = new Client({
//       user_account: savedUserAccount._id,
//       ...clientDetails,
//     });

//     // Save the client to the database
//     const savedClient = await client.save();

//     sendToken(userAccount, savedClient, 201, res);
//   }
// );

// export const loginClient = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     const userAccount: IUserAccount | null = await UserAccount.findOne({
//       email,
//     });

//     // If the user account doesn't exist, return an error
//     if (!userAccount) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Check if the password matches
//     const isMatch = await userAccount.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Find the associated hire manager by user_account
//     const client: IClient | null = await Client.findOne({
//       user_account: userAccount._id,
//     });
//     sendToken(userAccount, client, 200, res);
//   }
// );

// export const getFreelancer = catchAsyncErrors(
//   async (req: RequestType, res: Response) => {
//     console.log("ID", req.user);
//     const userAccountId = req.user?.id;

//     // Search for the UserAccount
//     const userAccount = await UserAccount.findById(userAccountId);

//     if (!userAccount) {
//       return res.status(404).json({
//         success: false,
//         message: "UserAccount not found",
//       });
//     }

//     // Use the user_account to find the corresponding Freelancer
//     const freelancer = await Freelancer.findOne({
//       user_account: userAccountId,
//     })
//       .populate("skills")
//       .populate("user_account");

//     if (!freelancer) {
//       return res.status(404).json({
//         success: false,
//         message: "Freelancer not found",
//       });
//     }
//     sendApiResponse(res, "success", freelancer);
//   }
// );

// export const loginUser = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     // Find the user account by email
//     const userAccount: IUserAccount | null = await UserAccount.findOne({
//       email,
//     });

//     // If the user account doesn't exist, return an error
//     if (!userAccount) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // Check if the password matches
//     const isMatch = await userAccount.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     // Find the associated client or freelancer by user_account
//     const client: IClient | null = await Client.findOne({
//       user_account: userAccount._id,
//     }).populate([
//       { path: "user_account", model: UserAccount },
//       { path: "skills", model: Skill },
//     ]);
//     const freelancer: IFreelancer | null = await Freelancer.findOne({
//       user_account: userAccount._id,
//     }).populate([
//       { path: "user_account", model: UserAccount },
//       { path: "skills", model: Skill },
//     ]);

//     // Determine the user type and send the corresponding token
//     if (client) {
//       sendToken(userAccount, client, 200, res);
//     } else if (freelancer) {
//       sendToken(userAccount, freelancer, 200, res);
//     } else {
//       return res.status(401).json({ error: "Invalid user type" });
//     }
//   }
// );

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
      avatar: BASE_URL + req.files[0].filename,
    });
    console.log("userAccount", userAccount);

    // Save the user account to the database
    const savedUserAccount = await userAccount.save();

    let user;
    if (role === UserRole.FREELANCER) {
      // Create a new freelancer with the associated user account
      const freelancer: IFreelancer = new Freelancer({
        user_account: savedUserAccount._id,
        ...userDetails,
      });

      // Save the freelancer to the database
      user = await freelancer.save();
    } else if (role === UserRole.CLIENT) {
      // Create a new client with the associated user account
      const client: IClient = new Client({
        user_account: savedUserAccount._id,
        ...userDetails,
      });

      // Save the client to the database
      user = await client.save();
    }

    sendToken(savedUserAccount, user, 200, res);
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
