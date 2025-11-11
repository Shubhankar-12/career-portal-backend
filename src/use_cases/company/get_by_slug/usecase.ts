import { IFile } from "../../../db/files";
import { companyQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetCompanySlugDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetCompanySlugDto;
  auth: ResponseLocalAuth;
};
export class GetCompanySlugUseCase {
  async execute({ request }: UseCaseRequest): Promise<any> {
    const company = await companyQueries.getCompanyBySlug(request.slug);

    if (!company) return { error: "No company found with this slug" };

    return company;
  }
}
