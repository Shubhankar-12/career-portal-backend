import { IFile } from "../../../db/files";
import { companyQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetAllCompanyDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetAllCompanyDto;
};
export class GetAllCompanyUseCase {
  async execute({ request }: UseCaseRequest): Promise<any> {
    const jobs = await companyQueries.getAllCompany(request);

    if (jobs[0].paginatedResults.length == 0) {
      jobs[0].totalCount.push({ count: 0 });
    }

    return jobs[0];
  }
}
