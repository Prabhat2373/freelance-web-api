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

interface Pagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ApiResponse {
  status: string;
  data?: any;
  message?: string;
}

export const sendPaginatedApiResponse = (
  res: Response,
  status: string,
  data: any[] = [],
  message?: string
) => {
  const response: ApiResponse = {
    status,
    ...data,
    message,
  };

  res
    .status(status.toLocaleLowerCase() === "success" ? 200 : 404)
    .json(response);
};
