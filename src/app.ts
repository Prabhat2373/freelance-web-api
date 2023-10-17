import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user.route";
import { ErrorMiddleware } from "./middlewares/error";
import { jobRouter } from "./routes/job.route";
import cookieParser from "cookie-parser";
import { download } from "./helper/downloadImage";
import { proposalRouter } from "./routes/proposals.route";
import { contractRouter } from "./routes/contract.route";
import { companyRoutes } from "./routes/company.route";
import employeementRoutes from "./routes/employeement.routes";
// import { ErrorMiddleware } from "./middleware/error";
const app: Application = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag", "sameSite"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// ROUTES
app.use("/api/v1", userRouter);
app.use("/api/v1", jobRouter);
app.use("/api/v1", proposalRouter);
app.use("/api/v1", contractRouter);
app.use("/api/v1", companyRoutes);
app.use("/api/v1", employeementRoutes);

app.get("/api/v1/files/:name", download);
// TEST ONLY
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "connecttion success!",
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
