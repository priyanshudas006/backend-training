import { Request, Response } from "express";
import * as studentService from "../services/student.service";
import { CreateStudentDto, UpdateStudentDto } from "../types/student.types";

export const createStudent = async (
  req: Request<{}, {}, CreateStudentDto>,
  res: Response
): Promise<void> => {
  try {
    const { name, course, age } = req.body;
    const normalizedAge = Number(age);

    if (!name || !course || age === undefined) {
      res.status(400).json({
        success: false,
        message: "Name, course and age are required.",
      });
      return;
    }

    if (!Number.isInteger(normalizedAge) || normalizedAge <= 0) {
      res.status(400).json({
        success: false,
        message: "Age must be a positive integer.",
      });
      return;
    }

    const result = await studentService.createStudent({
      name,
      course,
      age: normalizedAge,
    });

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Create Student Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllStudents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await studentService.getAllStudents();

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Get Students Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getStudentById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await studentService.getStudentById(id);

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Get Student Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateStudent = async (
  req: Request<{ id: string }, {}, UpdateStudentDto>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { age } = req.body;

    if (age !== undefined && (!Number.isInteger(Number(age)) || Number(age) <= 0)) {
      res.status(400).json({
        success: false,
        message: "Age must be a positive integer.",
      });
      return;
    }

    const result = await studentService.updateStudent(id, req.body);

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Update Student Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteStudent = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await studentService.deleteStudent(id);

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Delete Student Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
