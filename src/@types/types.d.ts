// types/custom.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // This is where the decoded JWT user data will go
    }
  }
}
