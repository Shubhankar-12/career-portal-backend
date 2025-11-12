import { Request, Response } from "express";
import { UpdateJobDtoConverter } from "./dto";
import { UpdateJobUseCase } from "./usecase";
import { UpdateJobRequest } from "./request";
import { UpdateJobValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class UpdateJobController {
  private createJob: UpdateJobUseCase;

  constructor(createJob: UpdateJobUseCase) {
    this.createJob = createJob;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData: UpdateJobRequest = {
        ...req.body,
        ...req.file,
      };
      console.log("requestData", req.body.tags);

      // Validate Request
      const validator = new UpdateJobValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new UpdateJobDtoConverter(requestData);
      const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(400).json({ error: "Token not found" });
        return;
      }

      const auth: ResponseLocalAuth = {
        token: token || "",
        decodedToken: jwt.decode(token || "") as any,
      };

      // Execute Use Case
      const result = await this.createJob.execute({
        request: dtoObject.getDtoObject(),
        auth: auth,
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("UpdateJobController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
