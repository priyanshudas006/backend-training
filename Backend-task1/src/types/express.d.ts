import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export {};
