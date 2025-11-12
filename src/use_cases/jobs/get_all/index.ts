import { GetAllJobsController } from "./controller";
import { GetAllJobsUseCase } from "./usecase";

const getAllJobsUseCase = new GetAllJobsUseCase();

export const getAllJobsController = new GetAllJobsController(getAllJobsUseCase);
