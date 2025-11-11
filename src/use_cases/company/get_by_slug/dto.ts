import { GetCompanySlugRequest } from "./request";

export interface GetCompanySlugDto {
  slug: string;
}

export class GetCompanySlugDtoConverter {
  private output_object: GetCompanySlugDto;

  constructor(data: GetCompanySlugRequest) {
    this.output_object = {
      slug: data.slug,
    };
  }

  public getDtoObject(): GetCompanySlugDto {
    return this.output_object;
  }
}
