import { Request, Response } from "express";

import studentQueue from "../../queues/student.queue";

import {
  CreateStudentDto,
  UpdateStudentDto,
} from "../../types/student.types";

/**
 * @desc Queue Create Student Job
 * @route POST /api/v2/students
 */
export const createStudent = async (
  req: Request<{}, {}, CreateStudentDto>,
  res: Response
): Promise<void> => {
  try {
    const studentData = req.body;

    const job = await studentQueue.add(
      "CREATE_STUDENT",
      studentData
    );

    res.status(202).json({
      success: true,
      message: "Student creation job queued successfully.",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Create Student Handler Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc Queue Update Student Job
 * @route PUT /api/v2/students/:id
 */
export const updateStudent = async (
  req: Request<{ id: string }, {}, UpdateStudentDto>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await studentQueue.add(
      "UPDATE_STUDENT",
      {
        id,
        ...req.body,
      }
    );

    res.status(202).json({
      success: true,
      message: "Student update job queued successfully.",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Update Student Handler Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc Queue Delete Student Job
 * @route DELETE /api/v2/students/:id
 */
export const deleteStudent = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await studentQueue.add(
      "DELETE_STUDENT",
      {
        id,
      }
    );

    res.status(202).json({
      success: true,
      message: "Student deletion job queued successfully.",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Delete Student Handler Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};