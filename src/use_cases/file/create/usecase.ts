import AWS, { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { IFile } from "../../../db/files";
import { CreateFileDto } from "./dto";
import { ResponseLocalAuth, ErrorResponse } from "../../../types/all_types";

type UseCaseRequest = {
  request: CreateFileDto;
  auth: ResponseLocalAuth;
};

type S3UploadResult = ManagedUpload.SendData;

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

type MediaResponse = {
  name: string;
  url: string;
  mime_type: string;
};

export class CreateFileUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<MediaResponse | ErrorResponse> {
    if (!request.buffer) {
      return { error: "No file found, please upload a file." };
    }

    const fileParts = request.originalname.split(".");
    const fileType = fileParts[fileParts.length - 1];
    const baseName = fileParts.slice(0, -1).join(".") || "document";
    const generatedUuid = uuid();

    // 🔹 Determine path
    const folder = request.folder ? request.folder : "doc";
    const key = `${folder}/${generatedUuid}.${fileType}`;

    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: request.buffer,
      ContentType: request.mimetype,
    };

    try {
      const data: S3UploadResult = await s3.upload(params).promise();

      const fileData: MediaResponse = {
        url: data.Key,
        name: baseName.trim(),
        mime_type: request.mimetype,
      };

      return fileData;
    } catch (err: any) {
      console.error("S3 Upload Error:", err);
      return { error: "File upload failed. Please try again." };
    }
  }
}
