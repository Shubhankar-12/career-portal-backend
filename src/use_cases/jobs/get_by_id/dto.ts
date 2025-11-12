import { GetJobByIdRequest } from "./request";

export interface GetJobByIdDto {
  job_id: string;
}

export class GetJobByIdDtoConverter {
  private output_object: GetJobByIdDto;

  constructor(data: GetJobByIdRequest) {
    this.output_object = {
      job_id: data.job_id,
    };
  }

  public getDtoObject(): GetJobByIdDto {
    return this.output_object;
  }
}
