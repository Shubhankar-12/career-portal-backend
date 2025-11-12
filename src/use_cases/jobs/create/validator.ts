import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateJobRequest } from "./request";

const WorkPolicyEnum = ["Remote", "Hybrid", "Onsite"];
const SalaryPolicyEnum = ["CONFIDENTIAL", "RANGE", "FIXED"];

const validStatus = ["OPEN", "CLOSED"];

export class CreateJobValidator extends BaseValidator {
  private request: CreateJobRequest;
  constructor(request: CreateJobRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.company_id) &&
      errors.push("Invalid company id");

    !this.validateString(this.request.title) && errors.push("Invalid title");

    !this.validateString(this.request.description) &&
      errors.push("Invalid description");

    return errors;
  }
}
