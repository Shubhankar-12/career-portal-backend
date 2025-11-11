import { model } from "mongoose";
import { JobSchema } from "./schema";
import { IJobDocument } from "./types";

export const JobModel = model<IJobDocument>("job", JobSchema, "jobs");
