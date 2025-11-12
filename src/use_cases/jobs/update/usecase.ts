import { companyQueries, jobQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import slugify from "slugify";
import { UpdateJobDto } from "./dto";

type UseCaseRequest = {
  request: UpdateJobDto;
  auth: ResponseLocalAuth;
};

export class UpdateJobUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<any | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const jobResp = await jobQueries.getJobById(request.job_id);

    if (!jobResp) return { error: "No company found with this id" };

    const resp = await jobQueries.updateJob(request);
    const job = await jobQueries.getJobById(request.job_id);

    if (!job) return { error: "Error updating job" };

    if (job) return job;

    return { error: "Error updating Job" };
  }
}
