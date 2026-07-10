import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


import routes from "./routes";
import { globalErrorHandler } from "./errors/globalErrorHandler";
const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Routes
app.use("/api", routes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ARN Smart AC Service API Running Successfully 🚀",
  });
});
// Global Error Handler
app.use(globalErrorHandler);

export default app;