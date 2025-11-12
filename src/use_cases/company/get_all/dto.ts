import { GetAllCompanyRequest } from "./request";

export interface GetAllCompanyDto {
  pubished?: boolean;
}

export class GetAllCompanyDtoConverter {
  private output_object: GetAllCompanyDto;

  constructor(data: GetAllCompanyRequest) {
    this.output_object = {
      pubished: data.pubished,
    };
  }

  public getDtoObject(): GetAllCompanyDto {
    return this.output_object;
  }
}
