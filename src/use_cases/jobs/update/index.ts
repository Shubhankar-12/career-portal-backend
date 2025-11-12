import { UpdateJobController } from "./controller";
import { UpdateJobUseCase } from "./usecase";

const updateJobUseCase = new UpdateJobUseCase();

export const updateJobController = new UpdateJobController(updateJobUseCase);
