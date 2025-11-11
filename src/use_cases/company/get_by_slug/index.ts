import { GetCompanySlugController } from "./controller";
import { GetCompanySlugUseCase } from "./usecase";

const getCompanySlugUseCase = new GetCompanySlugUseCase();

export const getCompanySlugController = new GetCompanySlugController(
  getCompanySlugUseCase
);
