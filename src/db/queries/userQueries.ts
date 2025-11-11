import { IUserDocument, UserModel } from "../user";
import { Types, Model } from "mongoose";

const ObjectId = Types.ObjectId;

export class UserQueries {
  private userModel: Model<IUserDocument>;

  constructor() {
    this.userModel = UserModel;
  }

  createUser = async (data: any): Promise<any> => {
    return await this.userModel.create(data);
  };

  verifyUserById = async (id: string): Promise<any> => {
    return await this.userModel.find({ _id: id });
  };

  getUserById = async (id: string): Promise<any> => {
    let aggregateQuery: any[] = [];

    aggregateQuery.push({
      $match: {
        _id: new ObjectId(id),
      },
    });

    // look up company
    aggregateQuery.push({
      $lookup: {
        from: "companies",
        localField: "_id",
        foreignField: "user_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              company_id: "$_id",
              name: 1,
              slug: 1,
            },
          },
        ],
        as: "company",
      },
    });

    aggregateQuery.push({
      $unwind: {
        path: "$company",
        preserveNullAndEmptyArrays: true,
      },
    });

    aggregateQuery.push({
      $project: {
        _id: 0,
        user_id: "$_id",
        name: 1,
        email: 1,
        company: 1,
        created_at: 1,
        updated_at: 1,
      },
    });

    const result = await this.userModel.aggregate(aggregateQuery);

    if (result.length === 0) return null;
    return result[0];
  };

  getUserByEmail = async (email: string): Promise<any> => {
    return await this.userModel.findOne({ email: email });
  };
}
