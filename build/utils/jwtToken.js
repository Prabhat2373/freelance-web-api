"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { IUser } from "../model/user.model";
// import { IUser } from '../models/User.model';
// type SendTokenOptions = {
//   //   OPT: any;
//   user:
//     | (Document<unknown, {}, IUser> &
//         Omit<
//           IUser & {
//             _id: Types.ObjectId;
//           },
//           never
//         >)
//     | null;
//   statusCode: number;
//   res: Response;
//   options?: SendTokenOptions;
// };
var sendToken = function (account, user, statusCode, res
// options?: SendTokenOptions
) {
    var token;
    if (account) {
        console.log("Freelancer", account);
        token = account.getJWTToken();
    }
    // options for cookie
    var cookieOptions = {
        expires: new Date(Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        SameSite: "none",
    };
    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        user: user,
        token: token,
    });
};
exports.default = sendToken;
