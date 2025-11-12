import express from "express";
import { authenticate } from "../helpers/AuthMiddleware";
import { createJobController } from "../use_cases/jobs/create";
import { updateJobController } from "../use_cases/jobs/update";
import { getAllJobsController } from "../use_cases/jobs/get_all";
import { deleteJobController } from "../use_cases/jobs/delete";
import { getJobByIdController } from "../use_cases/jobs/get_by_id";

export const jobRouter = express.Router();

jobRouter.post("/create", authenticate, createJobController.execute());
jobRouter.patch("/update", authenticate, updateJobController.execute());
jobRouter.get("/list", authenticate, getAllJobsController.execute());
jobRouter.delete("/delete", authenticate, deleteJobController.execute());
jobRouter.get("/", authenticate, getJobByIdController.execute());
