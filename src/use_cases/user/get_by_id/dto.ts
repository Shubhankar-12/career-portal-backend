import { GetByIdUserRequest } from "./request";

export interface GetByIdUserDto {
  user_id: string;
}

export class GetByIdUserDtoConverter {
  private output_object: GetByIdUserDto;

  constructor(data: GetByIdUserRequest) {
    this.output_object = {
      user_id: data.user_id,
    };
  }

  public getDtoObject(): GetByIdUserDto {
    return this.output_object;
  }
}
