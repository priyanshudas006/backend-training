import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/auth.types";

const authorizeRole = (role: UserRole) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
        return;
      }

      if (req.user.role !== role) {
        res.status(403).json({
          success: false,
          message: "Access denied. Insufficient permissions.",
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

export default authorizeRole;
