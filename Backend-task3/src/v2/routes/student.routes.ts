import { Router } from "express";

import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "../handlers/student.handler";

import verifyToken from "../../middleware/verifyToken";
import authorizeRole from "../../middleware/authorizeRole";

const router = Router();

/**
 * @route POST /api/v2/students
 * @desc Queue Create Student Job
 * @access Private
 */
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  createStudent
);

/**
 * @route PUT /api/v2/students/:id
 * @desc Queue Update Student Job
 * @access Private
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  updateStudent
);

/**
 * @route DELETE /api/v2/students/:id
 * @desc Queue Delete Student Job
 * @access Private
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  deleteStudent
);

export default router;