import { CreateJobController } from "./controller";
import { CreateJobUseCase } from "./usecase";

const createJobUseCase = new CreateJobUseCase();

export const createJobController = new CreateJobController(createJobUseCase);
