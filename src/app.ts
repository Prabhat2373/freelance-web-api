import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user.route";
import { ErrorMiddleware } from "./middlewares/error";
// import { ErrorMiddleware } from "./middleware/error";
const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

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
