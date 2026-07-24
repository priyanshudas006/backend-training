export type UserRole = "user" | "admin";

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: string;
}

export interface ServiceResponse<T = unknown> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  token?: string;
}
