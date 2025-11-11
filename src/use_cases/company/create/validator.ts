import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateCompanyRequest } from "./request";

export class CreateCompanyValidator extends BaseValidator {
  private request: CreateCompanyRequest;
  constructor(request: CreateCompanyRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
