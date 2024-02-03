import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { download } from "./helper/downloadImage";
import { ErrorMiddleware } from "./middlewares/error";
// import { companyRoutes } from "./routes/company.routes";
import { contractRouter } from "./routes/contract.route";
import employeementRoutes from "./routes/employeement.routes";
import { jobRouter } from "./routes/job.route";
import paymentsRouter from "./routes/payments.routes";
import { proposalRouter } from "./routes/proposals.route";
import { userRouter } from "./routes/user.route";
import { testRoutes } from "./routes/test.routes";
import corsConfig from "./config/cors.config";
import appRouter from "./routes/app.routes";

const app: Application = express();

app.use(corsConfig);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// ROUTES
app.use("/api/v1", userRouter);
app.use("/api/v1", jobRouter);
app.use("/api/v1", proposalRouter);
app.use("/api/v1", contractRouter);
// app.use("/api/v1", companyRoutes);
app.use("/api/v1", employeementRoutes);
app.use("/api/v1", paymentsRouter);
app.use("/api/v1", appRouter);
app.use("/api/v1", testRoutes);

app.get("/api/v1/files/:name", download);
// TEST ONLY
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "connection success!",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "NO ROUTE FOUND!",
  });
});

app.use(ErrorMiddleware);
export default app;
