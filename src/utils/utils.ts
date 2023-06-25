import { Response } from "express";

interface ApiResponse {
  status: string;
  data?: any;
  message?: string;
}

export const sendApiResponse = (
  res: Response,
  status: string,
  data?: any,
  message?: string
) => {
  const response: ApiResponse = {
    status,
    data,
    message,
  };

  res
    .status(status.toLocaleLowerCase() === "success" ? 200 : 404)
    .json(response);
};
