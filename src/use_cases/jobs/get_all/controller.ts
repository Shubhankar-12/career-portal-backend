import { Request, Response } from "express";
import { GetAllJobsDtoConverter } from "./dto";
import { GetAllJobsUseCase } from "./usecase";
import { GetAllJobsRequest } from "./request";
import { GetAllJobsValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class GetAllJobsController {
  private getAllJobsUseCase: GetAllJobsUseCase;

  constructor(getAllJobsUseCase: GetAllJobsUseCase) {
    this.getAllJobsUseCase = getAllJobsUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetAllJobsRequest;

      // Validate Request
      const validator = new GetAllJobsValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetAllJobsDtoConverter(requestData);

      // Execute Use Case
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

      const result = await this.getAllJobsUseCase.execute({
        request: dtoObject.getDtoObject(),
        auth: auth,
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }
      const formattedResponse = {
        result: result.paginatedResults,
        metadata: {
          totalCount: result.totalCount?.[0]?.count || 0,
          closedJobs: result?.closedJobs?.count || 0,
          openJobs: result?.openJobs?.count || 0,
          locationArray: result?.locationArray || [],
        },
      };
      res.status(200).json(formattedResponse);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("GetAllJobsController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
