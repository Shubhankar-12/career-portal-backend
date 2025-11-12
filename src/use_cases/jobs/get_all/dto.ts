import { GetAllJobsRequest } from "./request";

export interface GetAllJobsDto {
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

export class GetAllJobsDtoConverter {
  private output_object: GetAllJobsDto;

  constructor(data: GetAllJobsRequest) {
    this.output_object = {
      skip: data.skip ? Number(data.skip) : 0,
      limit: data.limit ? Number(data.limit) : 10,
      search: data.search ? data.search : "",
      sort_by: data.sort_by ? data.sort_by : "",
      company_id: data.company_id ? data.company_id : "",
      work_policy: data.work_policy ? data.work_policy : "",
      department: data.department ? data.department : "",
      employment_type: data.employment_type ? data.employment_type : "",
      experience_level: data.experience_level ? data.experience_level : "",
      job_type: data.job_type ? data.job_type : "",
      salary_type: data.salary_type ? data.salary_type : "",
      location: data.location ? data.location : "",
      status: data.status ? data.status : "",
    };
    if (data.limit) {
      this.output_object.limit = Number(data.limit);
    }
  }

  public getDtoObject(): GetAllJobsDto {
    return this.output_object;
  }
}
