import supabase from "../config/supabase";

import {
  CreateStudentDto,
  Student,
  UpdateStudentDto,
} from "../types/student.types";

import { ServiceResponse } from "../types/auth.types";

export const createStudent = async (
  studentData: CreateStudentDto
): Promise<ServiceResponse> => {
  try {
    const { data, error } = await supabase
      .from("students")
      .insert([studentData])
      .select()
      .single<Student>();

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Student created successfully.",
      statusCode: 201,
      data,
    };
  } catch (error) {
    console.error("Create Student Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const getAllStudents = async (): Promise<ServiceResponse> => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Students fetched successfully.",
      statusCode: 200,
      data,
    };
  } catch (error) {
    console.error("Get Students Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const getStudentById = async (
  id: string
): Promise<ServiceResponse> => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .maybeSingle<Student>();

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        success: false,
        message: "Student not found.",
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: "Student fetched successfully.",
      statusCode: 200,
      data,
    };
  } catch (error) {
    console.error("Get Student Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const updateStudent = async (
  id: string,
  studentData: UpdateStudentDto
): Promise<ServiceResponse> => {
  try {
    const { data, error } = await supabase
      .from("students")
      .update(studentData)
      .eq("id", id)
      .select()
      .maybeSingle<Student>();

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        success: false,
        message: "Student not found.",
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: "Student updated successfully.",
      statusCode: 200,
      data,
    };
  } catch (error) {
    console.error("Update Student Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const deleteStudent = async (
  id: string
): Promise<ServiceResponse> => {
  try {
    const { data, error } = await supabase
      .from("students")
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle<Student>();

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        success: false,
        message: "Student not found.",
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: "Student deleted successfully.",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Delete Student Service Error:", error);

    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};
