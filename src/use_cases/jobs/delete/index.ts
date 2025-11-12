import { DeleteJobController } from "./controller";
import { DeleteJobUseCase } from "./usecase";

const deleteJobUseCase = new DeleteJobUseCase();

export const deleteJobController = new DeleteJobController(deleteJobUseCase);
