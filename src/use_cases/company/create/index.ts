import { CreateCompanyController } from "./controller";
import { CreateCompanyUseCase } from "./usecase";

const createCompanyUseCase = new CreateCompanyUseCase();

export const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);
