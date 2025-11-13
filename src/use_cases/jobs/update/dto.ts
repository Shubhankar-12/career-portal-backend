import { UpdateJobRequest } from "./request";
export interface UpdateJobDto {
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
  min_salary?: number;
  max_salary?: number;
  salary_fixed?: number;
  salary_frequency?: string;
  currency?: string;
  posted_at?: Date;
  status?: string;
}

export class UpdateJobDtoConverter {
  private output_object: UpdateJobDto;

  constructor(data: UpdateJobRequest) {
    this.output_object = {
      job_id: data.job_id,
      company_id: data.company_id,
      title: data.title,
      description: data.description,
      location: data.location,
      work_policy: data.work_policy,
      department: data.department,
      employment_type: data.employment_type,
      experience_level: data.experience_level,
      job_type: data.job_type,
      salary_type: data.salary_type,
      min_salary: data.min_salary,
      max_salary: data.max_salary,
      salary_fixed: data.salary_fixed,
      salary_frequency: data.salary_frequency,
      currency: data.currency,
      posted_at: data.posted_at,
      status: data.status,
    };
  }

  public getDtoObject(): UpdateJobDto {
    return this.output_object;
  }
}
