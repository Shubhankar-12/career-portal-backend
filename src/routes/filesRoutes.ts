import express from "express";
import multer from "multer";
import { authenticate } from "../helpers/AuthMiddleware";
import { createFileController } from "../use_cases/file/create";

export const filesRouter = express.Router();

const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB

filesRouter.post(
  "/upload",
  authenticate,
  upload.single("document"),
  createFileController.execute()
);
