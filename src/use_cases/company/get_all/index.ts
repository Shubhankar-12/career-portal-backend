import { GetAllCompanyController } from "./controller";
import { GetAllCompanyUseCase } from "./usecase";

const getAllCompanyUseCase = new GetAllCompanyUseCase();

export const getAllCompanyController = new GetAllCompanyController(
  getAllCompanyUseCase
);
