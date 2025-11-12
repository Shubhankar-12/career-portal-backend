import { Request, Response } from "express";
import { GetCompanyByIdDtoConverter } from "./dto";
import { GetCompanyByIdUseCase } from "./usecase";
import { GetCompanyByIdRequest } from "./request";
import { GetCompanyByIdValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class GetCompanyByIdController {
  private getCompanyByIdUseCase: GetCompanyByIdUseCase;

  constructor(getCompanyByIdUseCase: GetCompanyByIdUseCase) {
    this.getCompanyByIdUseCase = getCompanyByIdUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetCompanyByIdRequest;

      // Validate Request
      const validator = new GetCompanyByIdValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetCompanyByIdDtoConverter(requestData);

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

      const result = await this.getCompanyByIdUseCase.execute({
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
    console.error("GetCompanyByIdController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
