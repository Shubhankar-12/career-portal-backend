import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetCompanyByIdRequest } from "./request";

export class GetCompanyByIdValidator extends BaseValidator {
  private request: GetCompanyByIdRequest;
  constructor(request: GetCompanyByIdRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.company_id) &&
      errors.push("Invalid company id");

    return errors;
  }
}
