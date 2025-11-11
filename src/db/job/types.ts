import { Document } from "mongoose";

export interface IJob {
  job_id: string;
  title: string;
  description: string;
  company_id: string;
  location?: string;
  salary_range?: {
    min: number;
    max: number;
  };
  employment_type?: string;
  experience_level?: string;
  job_type?: string;
  work_policy?: "Remote" | "Hybrid" | "Onsite";
  salary_type: "CONFIDENTIAL" | "RANGE" | "FIXED";
  salary_fixed?: number;
  currency: string;
  job_slug: string;
  posted_at: Date;
  status: "OPEN" | "CLOSED";
  created_at: Date;
  updated_at: Date;
}

export interface IJobDocument extends IJob, Document {}
