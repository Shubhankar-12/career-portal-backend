import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { UpdateJobRequest } from "./request";

export class UpdateJobValidator extends BaseValidator {
  private request: UpdateJobRequest;
  constructor(request: UpdateJobRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    !this.validateId(this.request.job_id) && errors.push("Invalid job id");

    return errors;
  }
}
