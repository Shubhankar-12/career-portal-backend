import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { UpdateCompanyRequest } from "./request";

const validStatus = ["DRAFT", "PUBLISHED"];
export class UpdateCompanyValidator extends BaseValidator {
  private request: UpdateCompanyRequest;
  constructor(request: UpdateCompanyRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.company_id) &&
      errors.push("Invalid company id");

    this.request.published &&
      !this.validateEnum(this.request.published, validStatus) &&
      errors.push(
        "Invalid status format. Available options: " + validStatus.join(", ")
      );

    return errors;
  }
}
