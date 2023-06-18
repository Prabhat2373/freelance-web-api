import jwt from "jsonwebtoken";
// import catchAsyncErrors from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { Document, Types } from "mongoose";
import UserAccount, { IUserAccount } from "../models/account.model";
import catchAsyncErrors from "./catchAsyncErrors";
// import { IUser, User } from "../model/user.model";

interface RequestType extends Request {
  cookies: {
    token: string;
  };
  user: (Document & Omit<IUserAccount & { _id: Types.ObjectId }, "_id">) | null;
}

interface AuthMiddlewareFactory {
  createAuthenticatedUserMiddleware(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  //   createAuthorizeRolesMiddleware(
  //     ...roles: any[]
  //   ): (req: RequestType, res: Response, next: NextFunction) => void;
}

class AuthMiddleware implements AuthMiddlewareFactory {
  createAuthenticatedUserMiddleware() {
    return catchAsyncErrors(
      async (req: RequestType, res: Response, next: NextFunction) => {
        const { token } = req.cookies;

        console.log("HAS TOKEN", token);

        if (!token) {
          console.log("NOT TOKEN");
          return next(
            new ErrorHandler("Please Login to access this resource", 401)
          );
        }
        const decodedData: { id: string } | null = jwt.verify(
          token,
          process.env.JWT_SECRET ?? ""
        ) as { id: string } | null;

        req.user = (await UserAccount.findById(
          decodedData?.id
        )) as RequestType["user"];

        next();
      }
    );
  }

  //   createAuthorizeRolesMiddleware(...roles: any[]) {
  //     return (req: RequestType, res: Response, next: NextFunction) => {
  //       if (!roles.includes(req.user?.role)) {
  //         return next(
  //           new ErrorHandler(
  //             `Role: ${req.user?.role} is not allowed to access this resource`,
  //             403
  //           )
  //         );
  //       }

  //       next();
  //     };
  //   }
}

export default AuthMiddleware;
