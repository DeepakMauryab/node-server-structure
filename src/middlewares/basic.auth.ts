import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import ApiError from "../utils/apiError";

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  const user = username === process.env.BASIC_AUTH_USER;
  if (
    user &&
    bcrypt.compareSync(password, process.env.BASIC_AUTH_PASSWORD as string)
  ) {
    req.user = user;
    next();
  } else {
    throw new ApiError(401, "Invalid credentials");
  }
};

export default basicAuth;
