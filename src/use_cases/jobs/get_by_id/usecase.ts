import { IFile } from "../../../db/files";
import { jobQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetJobByIdDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetJobByIdDto;
  auth: ResponseLocalAuth;
};
export class GetJobByIdUseCase {
  async execute({ request }: UseCaseRequest): Promise<any> {
    const company = await jobQueries.getJobById(request.job_id);

    if (!company) return { error: "No company found with this slug" };

    return company;
  }
}
