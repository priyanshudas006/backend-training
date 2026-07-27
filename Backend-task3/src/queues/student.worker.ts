require("dotenv").config();

import { Job, Worker } from "bullmq";
import redisClient from "../config/redis";

import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/student.service";

const studentWorker = new Worker(
  "studentQueue",
  async (job: Job) => {
    console.log(`Processing Job : ${job.name}`);

    switch (job.name) {
      case "CREATE_STUDENT":
        await createStudent(job.data);
        console.log("Student Created Successfully");
        break;

      case "UPDATE_STUDENT":
        await updateStudent(job.data.id, job.data);
        console.log("Student Updated Successfully");
        break;

      case "DELETE_STUDENT":
        await deleteStudent(job.data.id);
        console.log("Student Deleted Successfully");
        break;

      default:
        throw new Error(`Unknown Job Type : ${job.name}`);
    }
  },
  {
    connection: redisClient,
    concurrency: 5,
  }
);

/* ---------------- Worker Events ---------------- */

studentWorker.on("ready", () => {
  console.log("Student Worker Started");
});

studentWorker.on("completed", (job) => {
  console.log(`Job ${job.id} Completed`);
});

studentWorker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} Failed`);
  console.error(error.message);
});

studentWorker.on("error", (error) => {
  console.error("Worker Error :", error);
});

export default studentWorker;
