import { CreateFileRequest } from "./request";
export interface CreateFileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  folder?: string;
}

export class CreateFileDtoConverter {
  private output_object: CreateFileDto;

  constructor(data: CreateFileRequest) {
    this.output_object = {
      fieldname: data.fieldname,
      originalname: data.originalname,
      encoding: data.encoding,
      mimetype: data.mimetype,
      size: data.size,
      buffer: data.buffer,
      folder: data.folder ? data.folder : "",
    };
  }

  public getDtoObject(): CreateFileDto {
    return this.output_object;
  }
}
