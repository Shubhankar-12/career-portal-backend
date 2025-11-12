import { GetJobByIdController } from "./controller";
import { GetJobByIdUseCase } from "./usecase";

const getJobByIdUseCase = new GetJobByIdUseCase();

export const getJobByIdController = new GetJobByIdController(getJobByIdUseCase);
