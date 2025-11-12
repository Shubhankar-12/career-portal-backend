import { GetCompanyByIdController } from "./controller";
import { GetCompanyByIdUseCase } from "./usecase";

const getCompanyByIdUseCase = new GetCompanyByIdUseCase();

export const getCompanyByIdController = new GetCompanyByIdController(
  getCompanyByIdUseCase
);
