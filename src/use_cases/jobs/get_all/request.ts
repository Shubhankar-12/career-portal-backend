/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GetAllJobsRequest {
  job_id?: string; // projected as job_id: "$_id"
  company_id: string;
  search?: string;
  work_policy?: string;
  department?: string;
  employment_type?: string;
  experience_level?: string;
  job_type?: string;
  salary_type?: string;
  location?: string;
  status?: string;
  skip?: number;
  limit?: number;
  sort_by?: string;
}
