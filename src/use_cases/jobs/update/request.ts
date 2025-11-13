/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UpdateJobRequest {
  job_id: string;
  company_id?: string;
  title?: string;
  description?: string;
  location?: string;
  work_policy?: string;
  department?: string;
  employment_type?: string;
  experience_level?: string;
  job_type?: string;
  salary_type?: string;
  salary_frequency?: string;

  min_salary?: number;
  max_salary?: number;
  salary_fixed?: number;
  currency?: string;
  posted_at?: Date;
  status?: string;
}
