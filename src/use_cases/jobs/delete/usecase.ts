import { Readable } from "stream";

import { jobQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { DeleteJobDto } from "./dto";

type UseCaseRequest = {
  request: DeleteJobDto;
  auth: ResponseLocalAuth;
};

type Response =
  | {
      message: string;
      job_id: string;
    }
  | ErrorResponse;

export class DeleteJobUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<Response> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    // Convert buffer to stream and upload to Cloudinary

    const resp = await jobQueries.deleteJob(request);

    if (resp)
      return {
        message: "File deleted successfully",
        job_id: request.job_id,
      };

    return { error: "Error deleting file" };
  }
}
