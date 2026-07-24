import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import supabase from "../config/supabase";
import {
  LoginUserDto,
  RegisterUserDto,
  ServiceResponse,
  User,
} from "../types/auth.types";

const SALT_ROUNDS = 10;

export const register = async (
  userData: RegisterUserDto
): Promise<ServiceResponse> => {
  try {
    const { name, email, password } = userData;
    const role = "user" as const;

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered.",
        statusCode: 409,
      };
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Save User
    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
        role,
      },
    ]);

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "User registered successfully.",
      statusCode: 201,
    };
  } catch (error) {
    console.error("Register Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const login = async (
  userData: LoginUserDto
): Promise<ServiceResponse> => {
  try {
    const { email, password } = userData;

    // Find User
    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, password, role")
      .eq("email", email)
      .maybeSingle<User>();

    if (error) {
      throw error;
    }

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
        statusCode: 401,
      };
    }

    // Compare Password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return {
        success: false,
        message: "Invalid email or password.",
        statusCode: 401,
      };
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"];

    if (!jwtSecret) {
      throw new Error("JWT_SECRET must be defined in the .env file.");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );

    return {
      success: true,
      message: "Login successful.",
      statusCode: 200,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};
