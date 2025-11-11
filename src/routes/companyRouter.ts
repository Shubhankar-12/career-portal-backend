import express from "express";
import { authenticate } from "../helpers/AuthMiddleware";
import { createCompanyController } from "../use_cases/company/create";
import { updateCompanyController } from "../use_cases/company/update";
import { getCompanySlugController } from "../use_cases/company/get_by_slug";

export const companyRouter = express.Router();

companyRouter.post("/create", authenticate, createCompanyController.execute());
companyRouter.patch("/update", authenticate, updateCompanyController.execute());
companyRouter.get("/", authenticate, getCompanySlugController.execute());
