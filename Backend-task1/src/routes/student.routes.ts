import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

import verifyToken from "../middleware/verifyToken";
import authorizeRole from "../middleware/authorizeRole";
import preCache from "../middleware/preCache";
import postCache from "../middleware/postCache";

const router = Router();

/**
 * @route POST /api/students
 * @desc Create Student
 * @access Private
 */
router.post("/", verifyToken, createStudent);

/**
 * @route GET /api/students
 * @desc Get All Students
 * @access Private
 */
router.get("/", verifyToken, preCache, postCache, getAllStudents);

/**
 * @route GET /api/students/:id
 * @desc Get Student By Id
 * @access Private
 */
router.get("/:id", verifyToken, preCache, postCache, getStudentById);

/**
 * @route PUT /api/students/:id
 * @desc Update Student
 * @access Private
 */
router.put("/:id", verifyToken, authorizeRole("admin"), updateStudent);

/**
 * @route DELETE /api/students/:id
 * @desc Delete Student
 * @access Private
 */
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteStudent);

export default router;
