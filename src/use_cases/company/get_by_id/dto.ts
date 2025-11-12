import { GetCompanyByIdRequest } from "./request";

export interface GetCompanyByIdDto {
  company_id: string;
}

export class GetCompanyByIdDtoConverter {
  private output_object: GetCompanyByIdDto;

  constructor(data: GetCompanyByIdRequest) {
    this.output_object = {
      company_id: data.company_id,
    };
  }

  public getDtoObject(): GetCompanyByIdDto {
    return this.output_object;
  }
}
