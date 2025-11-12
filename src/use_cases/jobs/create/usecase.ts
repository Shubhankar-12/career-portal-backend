import { companyQueries, jobQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import slugify from "slugify";
import { CreateJobDto } from "./dto";

type UseCaseRequest = {
  request: CreateJobDto;
  auth: ResponseLocalAuth;
};

export class CreateJobUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<any | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const companyResp = await companyQueries.getCompanyById(request.company_id);

    if (!companyResp) return { error: "No company found with this id" };

    // title + posted_at
    const jobSlug = slugify(
      `${companyResp.slug}-${request.title}-${Date.now()}`,
      { lower: true, strict: true }
    );

    const resp = await jobQueries.createJob({
      ...request,
      job_slug: jobSlug,
    });

    if (!resp) return { error: "Error creating job" };

    if (resp) return resp;

    return { error: "Error creating Job" };
  }
}
