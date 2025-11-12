import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetCompanySlugRequest } from "./request";

export class GetCompanySlugValidator extends BaseValidator {
  private request: GetCompanySlugRequest;
  constructor(request: GetCompanySlugRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateString(this.request.slug) && errors.push("Invalid user id");

    return errors;
  }
}
