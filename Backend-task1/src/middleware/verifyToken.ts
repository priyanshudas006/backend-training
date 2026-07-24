import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../types/auth.types";

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured.",
      });
      return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token is missing.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      jwtSecret
    ) as JwtPayload & {
      id: string;
      email: string;
      role: UserRole;
    };

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Verify Token Error:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;
