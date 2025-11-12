import { IFile } from "../../../db/files";
import { jobQueries } from "../../../db/queries";
import { ErrorResponse, ResponseLocalAuth } from "../../../types/all_types";
import { GetAllJobsDto } from "./dto";

// response will have token and file data or error message
type UseCaseRequest = {
  request: GetAllJobsDto;
  auth: ResponseLocalAuth;
};
export class GetAllJobsUseCase {
  async execute({ request, auth }: UseCaseRequest): Promise<any> {
    const jobs = await jobQueries.getAllJobs(request);

    const jobCounts: { count: number; status: "OPEN" | "CLOSED" }[] =
      await jobQueries.jobCountByStatus(request.company_id);
    // console.log("jobCounts", jobCounts); // [ { count: 1, status: 'CLOSED' }, { count: 16, status: 'OPEN' } ]
    const closedJobs = jobCounts.filter(
      (job) => job.status === "CLOSED"
    )[0] || { count: 0, status: "CLOSED" };
    const openJobs = jobCounts.filter((job) => job.status === "OPEN")[0] || {
      count: 0,
      status: "OPEN",
    };

    jobs[0].closedJobs = closedJobs;
    jobs[0].openJobs = openJobs;

    if (jobs[0].paginatedResults.length == 0) {
      jobs[0].totalCount.push({ count: 0 });
    }

    return jobs[0];
  }
}
