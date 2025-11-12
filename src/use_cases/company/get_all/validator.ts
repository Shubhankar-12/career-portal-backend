import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllCompanyRequest } from "./request";

const SortEnum = ["highest", "lowest", "newest", "oldest"];
const WorkTypeEnum = ["Remote", "Hybrid", "Onsite"];
const SalaryTypeEnum = ["CONFIDENTIAL", "RANGE", "FIXED"];
export class GetAllCompanyValidator extends BaseValidator {
  private request: GetAllCompanyRequest;
  constructor(request: GetAllCompanyRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    return errors;
  }
}
