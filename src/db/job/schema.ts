import { Schema, Types } from "mongoose";

export const JobSchema = new Schema(
  {
    company_id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    location: {
      type: String,
    },
    work_policy: { type: String, enum: ["Remote", "Hybrid", "Onsite"] },
    department: {
      type: String,
    },
    employment_type: {
      type: String,
    },
    experience_level: {
      type: String,
    },
    job_type: {
      type: String,
    },
    salary_type: {
      type: String,
      enum: ["CONFIDENTIAL", "RANGE", "FIXED"],
      default: "CONFIDENTIAL",
    },
    salary_range: {
      min: Number,
      max: Number,
    },
    salary_fixed: {
      type: Number,
    },
    currency: {
      type: String,
      default: "INR",
    },
    job_slug: { type: String, unique: true },
    description: {
      type: String,
    },
    posted_at: { type: Date, default: Date.now },
    status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
