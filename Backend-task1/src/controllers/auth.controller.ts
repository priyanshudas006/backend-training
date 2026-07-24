import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";

export const register = async (
  req: Request<{}, {}, RegisterUserDto>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
      return;
    }

    const result = await authService.register({
      name,
      email,
      password,
    });

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Register Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (
  req: Request<{}, {}, LoginUserDto>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const result = await authService.login({
      email,
      password,
    });

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Login Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
