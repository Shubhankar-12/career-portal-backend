import { IJobDocument, JobModel } from "../job";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class JobQueries {
  private jobModel: Model<IJobDocument>;

  constructor() {
    this.jobModel = JobModel;
  }

  createJob = async (data: any): Promise<any> => {
    return await this.jobModel.create(data);
  };

  updateJob = async (data: any): Promise<any> => {
    return await this.jobModel.updateOne(
      { _id: new ObjectId(data.job_id) },
      data
    );
  };

  getJobById = async (id: string): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        _id: new ObjectId(id),
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        job_id: "$_id",
        company_id: 1,
        title: 1,
        description: 1,
        work_policy: 1,
        department: 1,
        employment_type: 1,
        experience_level: 1,
        job_type: 1,
        salary_type: 1,
        salary_fixed: 1,
        currency: 1,
        location: 1,
        min_salary: 1,
        max_salary: 1,
        posted_at: 1,
        status: 1,
        views: 1,
        created_at: 1,
        updated_at: 1,
      },
    });

    const job = await this.jobModel.aggregate(aggregateQuery);
    if (job.length === 0) return null;
    return job[0];
  };

  getAllJobs = async (data: any): Promise<any> => {
    let aggregateQuery: any[] = [];
    if (data.search) {
      aggregateQuery.push({
        $match: {
          $or: [
            { title: { $regex: data.search, $options: "i" } },
            { description: { $regex: data.search, $options: "i" } },
          ],
        },
      });
    }

    // comany_id
    if (data.company_id) {
      aggregateQuery.push({
        $match: {
          company_id: new ObjectId(data.company_id),
        },
      });
    }

    // work_policy
    if (data.work_policy) {
      aggregateQuery.push({
        $match: {
          work_policy: data.work_policy,
        },
      });
    }

    // employment_type
    if (data.employment_type) {
      aggregateQuery.push({
        $match: {
          employment_type: data.employment_type,
        },
      });
    }

    // experience_level
    if (data.experience_level) {
      aggregateQuery.push({
        $match: {
          experience_level: data.experience_level,
        },
      });
    }

    // job_type
    if (data.job_type) {
      aggregateQuery.push({
        $match: {
          job_type: data.job_type,
        },
      });
    }

    // location
    if (data.location) {
      aggregateQuery.push({
        $match: {
          location: data.location,
        },
      });
    }

    // sort by sort_by = [newest, oldest, highest salary, lowest salary]
    // 💡 Add computed salary before sorting
    aggregateQuery.push({
      $addFields: {
        effective_salary: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$salary_type", "FIXED"] },
                then: "$salary_fixed",
              },
              {
                case: { $eq: ["$salary_type", "RANGE"] },
                then: { $avg: ["$min_salary", "$max_salary"] },
              },
            ],
            default: 0, // for CONFIDENTIAL or missing salary
          },
        },
      },
    });

    // ✅ Sort Logic
    if (data.sort_by) {
      if (data.sort_by === "newest") {
        aggregateQuery.push({ $sort: { posted_at: -1 } });
      } else if (data.sort_by === "oldest") {
        aggregateQuery.push({ $sort: { posted_at: 1 } });
      } else if (data.sort_by === "highest") {
        aggregateQuery.push({ $sort: { effective_salary: -1 } });
      } else if (data.sort_by === "lowest") {
        aggregateQuery.push({ $sort: { effective_salary: 1 } });
      }
    } else {
      aggregateQuery.push({ $sort: { posted_at: -1 } });
    }

    // status
    if (data.status) {
      aggregateQuery.push({
        $match: {
          status: data.status,
        },
      });
    }

    // project
    aggregateQuery.push({
      $project: {
        _id: 0,
        job_id: "$_id",
        company_id: 1,
        title: 1,
        description: 1,
        work_policy: 1,
        department: 1,
        employment_type: 1,
        experience_level: 1,
        job_type: 1,
        salary_type: 1,
        salary_fixed: 1,
        currency: 1,
        location: 1,
        min_salary: 1,
        max_salary: 1,
        posted_at: 1,
        status: 1,
        views: 1,
      },
    });

    const $facet: any = {
      paginatedResults: [],
      totalCount: [{ $count: "count" }],
    };
    if (data.skip != undefined) {
      $facet.paginatedResults.push({ $skip: data.skip });
    }
    if (data.limit != undefined) {
      $facet.paginatedResults.push({ $limit: data.limit });
    }
    aggregateQuery.push({ $facet });

    return await this.jobModel.aggregate(aggregateQuery);
  };

  deleteJob = async (job_id: any): Promise<any> => {
    return await this.jobModel.deleteOne({ _id: new ObjectId(job_id) });
  };
}
