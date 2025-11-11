import { UpdateCompanyController } from "./controller";
import { UpdateCompanyUseCase } from "./usecase";

const updateCompanyUseCase = new UpdateCompanyUseCase();

export const updateCompanyController = new UpdateCompanyController(
  updateCompanyUseCase
);
