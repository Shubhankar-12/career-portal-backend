import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateJobRequest } from "./request";

export class CreateJobValidator extends BaseValidator {
  private request: CreateJobRequest;
  constructor(request: CreateJobRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
