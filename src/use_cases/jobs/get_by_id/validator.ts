import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetJobByIdRequest } from "./request";

export class GetJobByIdValidator extends BaseValidator {
  private request: GetJobByIdRequest;
  constructor(request: GetJobByIdRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    this.request.job_id &&
      !this.validateId(this.request.job_id) &&
      errors.push("Invalid job id");

    return errors;
  }
}
