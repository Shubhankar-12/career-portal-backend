import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { GetAllJobsRequest } from "./request";

const SortEnum = ["highest", "lowest", "newest", "oldest"];
const WorkTypeEnum = ["Remote", "Hybrid", "Onsite"];
const SalaryTypeEnum = ["CONFIDENTIAL", "RANGE", "FIXED"];
export class GetAllJobsValidator extends BaseValidator {
  private request: GetAllJobsRequest;
  constructor(request: GetAllJobsRequest) {
    super();
    this.request = request;
  }

  parseRequest(): String[] {
    const errors: string[] = [];

    this.request.company_id &&
      !this.validateId(this.request.company_id) &&
      errors.push("Invalid company id");

    this.request.job_id &&
      !this.validateId(this.request.job_id) &&
      errors.push("Invalid job id");

    this.request.skip &&
      !this.validateNumber(this.request.skip) &&
      errors.push("Invalid skip format");

    this.request.limit &&
      !this.validateNumber(this.request.limit) &&
      errors.push("Invalid limit format");

    this.request.sort_by &&
      !this.validateEnum(this.request.sort_by, SortEnum) &&
      errors.push(
        "Invalid sort format. Available options: " + SortEnum.join(", ")
      );

    this.request.work_policy &&
      !this.validateEnum(this.request.work_policy, WorkTypeEnum) &&
      errors.push(
        "Invalid work policy format. Available options: " +
          WorkTypeEnum.join(", ")
      );

    this.request.salary_type &&
      !this.validateEnum(this.request.salary_type, SalaryTypeEnum) &&
      errors.push(
        "Invalid salary type format. Available options: " +
          SalaryTypeEnum.join(", ")
      );

    return errors;
  }
}
