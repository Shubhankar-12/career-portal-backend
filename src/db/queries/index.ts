import { CompanyQueries } from "./companyQueries";
import { FileQueries } from "./filesQueries";
import { JobQueries } from "./jobQueries";
import { UserQueries } from "./userQueries";

export const userQueries = new UserQueries();
export const fileQueries = new FileQueries();
export const companyQueries = new CompanyQueries();
export const jobQueries = new JobQueries();
