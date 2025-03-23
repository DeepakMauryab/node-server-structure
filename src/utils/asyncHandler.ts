import { Request, Response, NextFunction } from "express";
import ApiError from "./apiError";

// Define the type of the handler function
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void; // Can return a Promise<void> or just `void`

const asyncHandler = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Execute the handler and catch any errors
    Promise.resolve(handler(req, res, next)).catch((err) => {
      next(new ApiError(500, err.toString()));
    });
  };
};

export default asyncHandler;
