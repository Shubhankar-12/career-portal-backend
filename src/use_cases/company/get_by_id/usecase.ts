import { companyQueries } from "../../../db/queries";
import { ResponseLocalAuth } from "../../../types/all_types";
import { GetCompanyByIdDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetCompanyByIdDto;
  auth: ResponseLocalAuth;
};
export class GetCompanyByIdUseCase {
  async execute({ request }: UseCaseRequest): Promise<any> {
    const company = await companyQueries.getCompanyById(request.company_id);

    if (!company) return { error: "No company found with this id" };

    return company;
  }
}
