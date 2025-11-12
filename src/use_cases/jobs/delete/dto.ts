import { DeleteJobRequest } from "./request";
export interface DeleteJobDto {
  job_id: string;
}

export class DeleteJobDtoConverter {
  private output_object: DeleteJobDto;

  constructor(data: DeleteJobRequest) {
    this.output_object = {
      job_id: data.job_id,
    };
  }

  public getDtoObject(): DeleteJobDto {
    return this.output_object;
  }
}
