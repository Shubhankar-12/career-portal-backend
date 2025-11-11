import { model } from "mongoose";
import { CompanySchema } from "./schema";
import { ICompanyDocument } from "./types";

export const CompanyModel = model<ICompanyDocument>(
  "company",
  CompanySchema,
  "companies"
);
