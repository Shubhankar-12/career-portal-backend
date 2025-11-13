import { BaseValidator } from "../../../helpers/BaseClasses/BaseValidator";
import { CreateJobRequest } from "./request";

const WorkPolicyEnum = ["Remote", "Hybrid", "Onsite"];
const SalaryPolicyEnum = ["CONFIDENTIAL", "RANGE", "FIXED"];
const SalaryFrequencyEnum = ["MONTHLY", "YEARLY"];
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

    this.request.location &&
      !this.validateString(this.request.location) &&
      errors.push("Invalid location");

    this.request.work_policy &&
      !this.validateEnum(this.request.work_policy, WorkPolicyEnum) &&
      errors.push(
        "Invalid work policy format. Available options: " +
          WorkPolicyEnum.join(", ")
      );

    this.request.department &&
      !this.validateString(this.request.department) &&
      errors.push("Invalid department");

    this.request.employment_type &&
      !this.validateString(this.request.employment_type) &&
      errors.push("Invalid employment type");

    this.request.experience_level &&
      !this.validateString(this.request.experience_level) &&
      errors.push("Invalid experience level");

    this.request.job_type &&
      !this.validateString(this.request.job_type) &&
      errors.push("Invalid job type");

    this.request.salary_type &&
      !this.validateEnum(this.request.salary_type, SalaryPolicyEnum) &&
      errors.push(
        "Invalid salary type format. Available options: " +
          SalaryPolicyEnum.join(", ")
      );

    this.request.min_salary &&
      !this.validateNumber(this.request.min_salary) &&
      errors.push("Invalid min salary format");

    this.request.max_salary &&
      !this.validateNumber(this.request.max_salary) &&
      errors.push("Invalid max salary format");

    this.request.salary_fixed &&
      !this.validateNumber(this.request.salary_fixed) &&
      errors.push("Invalid salary fixed format");

    this.request.salary_frequency &&
      !this.validateEnum(this.request.salary_frequency, SalaryFrequencyEnum) &&
      errors.push(
        "Invalid salary frequency format. Available options: " +
          SalaryFrequencyEnum.join(", ")
      );

    this.request.currency &&
      !this.validateString(this.request.currency) &&
      errors.push("Invalid currency format");

    this.request.status &&
      !this.validateEnum(this.request.status, validStatus) &&
      errors.push(
        "Invalid status format. Available options: " + validStatus.join(", ")
      );

    return errors;
  }
}
