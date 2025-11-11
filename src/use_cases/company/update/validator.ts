import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { UpdateCompanyRequest } from "./request";

export class UpdateCompanyValidator extends BaseValidator {
  private request: UpdateCompanyRequest;
  constructor(request: UpdateCompanyRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
