import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { DeleteJobRequest } from "./request";

export class DeleteJobValidator extends BaseValidator {
  private request: DeleteJobRequest;
  constructor(request: DeleteJobRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];
    !this.validateId(this.request.job_id) && errors.push("Invalid job id");

    return errors;
  }
}
