import { companyQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";

import { UpdateCompanyDto } from "./dto";

type UseCaseRequest = {
  request: UpdateCompanyDto;
  auth: ResponseLocalAuth;
};

export class UpdateCompanyUseCase {
  async execute({
    request,
    auth,
  }: UseCaseRequest): Promise<any | ErrorResponse> {
    const token = auth.token;
    if (!token) return { error: "Not authenticated" };

    const userId = auth.decodedToken.user_id;

    const companyResp = await companyQueries.updateCompany({
      ...request,
      user_id: userId,
    });

    const resp = await companyQueries.getCompanyByUserId(userId);

    if (!resp) return { error: "Error updating company" };

    if (resp) return resp;

    return { error: "Error updating Company" };
  }
}
