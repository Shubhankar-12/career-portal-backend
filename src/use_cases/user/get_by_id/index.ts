import { GetByIdUserController } from "./controller";
import { GetByIdUserUseCase } from "./usecase";

const getByIdUserUseCase = new GetByIdUserUseCase();

export const getByIdUserController = new GetByIdUserController(
  getByIdUserUseCase
);
