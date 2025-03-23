import { Response } from "express";

class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

const apiResponse = (
  res: Response,
  status: number,
  message: string,
  data?: any
) => {
  res.send(new ApiResponse(status, data, message));
};

export default apiResponse;
