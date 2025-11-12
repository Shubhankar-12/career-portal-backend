import { Request, Response } from "express";
import { GetAllCompanyDtoConverter } from "./dto";
import { GetAllCompanyUseCase } from "./usecase";
import { GetAllCompanyRequest } from "./request";
import { GetAllCompanyValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class GetAllCompanyController {
  private getAllCompanyUseCase: GetAllCompanyUseCase;

  constructor(getAllCompanyUseCase: GetAllCompanyUseCase) {
    this.getAllCompanyUseCase = getAllCompanyUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetAllCompanyRequest;

      // Validate Request
      const validator = new GetAllCompanyValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetAllCompanyDtoConverter(requestData);

      // Execute Use Case

      const result = await this.getAllCompanyUseCase.execute({
        request: dtoObject.getDtoObject(),
      });

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }
      const formattedResponse = {
        result: result.paginatedResults,
        metadata: {
          totalCount: result.totalCount?.[0]?.count || 0,
        },
      };
      res.status(200).json(formattedResponse);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("GetAllCompanyController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
