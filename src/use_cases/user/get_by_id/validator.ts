import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetByIdUserRequest } from "./request";

export class GetByIdUserValidator extends BaseValidator {
  private request: GetByIdUserRequest;
  constructor(request: GetByIdUserRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    this.request.user_id &&
      !this.validateId(this.request.user_id) &&
      errors.push("Invalid user id");

    return errors;
  }
}
