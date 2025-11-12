import express from "express";
import { authRouter } from "./authRoutes";
import { filesRouter } from "./filesRoutes";
import { companyRouter } from "./companyRouter";
import { userRouter } from "./userRoutes";
import { jobRouter } from "./jobRouter";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/company", companyRouter);
apiRouter.use("/jobs", jobRouter);

export { apiRouter };
