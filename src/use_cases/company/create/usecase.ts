import { companyQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import slugify from "slugify";
import { CreateCompanyDto } from "./dto";

type UseCaseRequest = {
  request: CreateCompanyDto;
  auth: ResponseLocalAuth;
};

export class CreateCompanyUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<any | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    // use slugify
    let slug = slugify(request.name, { lower: true, strict: true });

    const existingCompany = await companyQueries.getCompanyBySlug(slug);

    if (existingCompany) slug += `-${Date.now()}`;

    const companyResp = await companyQueries.createCompany({
      ...request,
      slug: slug,
      user_id: userId,
    });

    const resp = await companyQueries.getCompanyBySlug(companyResp.slug);

    if (!resp) return { error: "Error creating company" };

    if (resp && resp.company_id) return resp;

    return { error: "Error creating Company" };
  }
}
