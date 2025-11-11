import { IFile } from "../../../db/files";
import { userQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetByIdUserDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetByIdUserDto;
  auth: ResponseLocalAuth;
};
export class GetByIdUserUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<any> {
    if (!auth.token) {
      return [];
    }

    if (!auth.decodedToken.user_id) {
      return [];
    }

    const user = await userQueries.getUserById(request.user_id);

    return user;
  }
}
