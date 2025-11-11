import { userQueries, companyQueries } from "../../../db/queries";

import { ErrorResponse } from "../../../types/all_types";
import { generateToken } from "../../../utils/general_utils";
import { LoginUserDto } from "./dto";
import bcrypt from "bcryptjs";

// response will have token and ngo data or error message

interface Response {
  token: string;
  user: {
    user_id: string;
    name: string;
    email: string;
  };
  company?: {
    company_id: string;
    name: string;
    slug: string;
  };
}

export class LoginUserUseCase {
  async execute(request: LoginUserDto): Promise<Response | ErrorResponse> {
    const existingUser = await userQueries.getUserByEmail(request.email);
    if (!existingUser) {
      return {
        error: "No user found with this email",
      };
    }
    const matchPassword = bcrypt.compareSync(
      request.password,
      existingUser.password
    );

    if (!matchPassword) {
      return {
        error: "Email or password is incorrect",
      };
    }

    const token = generateToken({
      user_id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });

    const company = await companyQueries.getCompanyByUserId(existingUser._id);

    if (existingUser) {
      return {
        token: token,
        user: {
          user_id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
        company: company
          ? {
              company_id: company._id,
              name: company.name,
              slug: company.slug,
            }
          : undefined,
      };
    }

    return {
      error: "Error logging in user",
    };
  }
}
