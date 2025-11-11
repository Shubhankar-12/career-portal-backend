import { ICompanyDocument, CompanyModel } from "../company";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class CompanyQueries {
  private companyModel: Model<ICompanyDocument>;

  constructor() {
    this.companyModel = CompanyModel;
  }

  createCompany = async (data: any): Promise<any> => {
    return await this.companyModel.create(data);
  };

  updateCompany = async (data: any): Promise<any> => {
    return await this.companyModel.updateOne(
      { _id: new ObjectId(data.company_id) },
      data
    );
  };

  getCompanyByUserId = async (id: string): Promise<any> => {
    return await this.companyModel.findOne({ user_id: new ObjectId(id) });
  };

  getCompanyBySlug = async (slug: string): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        slug: slug,
      },
    });

    aggregateQuery.push({
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    });

    aggregateQuery.push({
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        company_id: "$_id",
        user_id: 1,
        name: 1,
        slug: 1,
        description: 1,
        logo_url: 1,
        banner_url: 1,
        culture_video_url: 1,
        theme: 1,
        sections: 1,
        user: {
          user_id: "$user._id",
          name: "$user.name",
          email: "$user.email",
        },
      },
    });

    const company = await this.companyModel.aggregate(aggregateQuery);
    if (company.length === 0) return null;

    return company[0];
  };
}
