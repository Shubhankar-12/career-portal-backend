import { Request, Response } from "express";
import { GetCompanySlugDtoConverter } from "./dto";
import { GetCompanySlugUseCase } from "./usecase";
import { GetCompanySlugRequest } from "./request";
import { GetCompanySlugValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class GetCompanySlugController {
  private getCompanySlugUseCase: GetCompanySlugUseCase;

  constructor(getCompanySlugUseCase: GetCompanySlugUseCase) {
    this.getCompanySlugUseCase = getCompanySlugUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetCompanySlugRequest;

      // Validate Request
      const validator = new GetCompanySlugValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetCompanySlugDtoConverter(requestData);

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

      const result = await this.getCompanySlugUseCase.execute({
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
    console.error("GetCompanySlugController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
