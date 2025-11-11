import { Request, Response } from "express";
import { CreateCompanyDtoConverter } from "./dto";
import { CreateCompanyUseCase } from "./usecase";
import { CreateCompanyRequest } from "./request";
import { CreateCompanyValidator } from "./validator";
import { ResponseLocalAuth } from "../../../types/all_types";
import jwt from "jsonwebtoken";

export class CreateCompanyController {
  private createCompany: CreateCompanyUseCase;

  constructor(createCompany: CreateCompanyUseCase) {
    this.createCompany = createCompany;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData: CreateCompanyRequest = {
        ...req.body,
        ...req.file,
      };
      console.log("requestData", req.body.tags);

      // Validate Request
      const validator = new CreateCompanyValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreateCompanyDtoConverter(requestData);
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
      const result = await this.createCompany.execute({
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
    console.error("CreateCompanyController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
