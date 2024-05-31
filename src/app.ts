import express, { Application } from "express";
import cors from "cors";
import CorsOptions from "./config/cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.routes";
import baseRoutes from "./routes/ base.routes";
import { handleNotFound } from "./middlewares/errorHandler";
dotenv.config();

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors(CorsOptions));

//register base route
app.use("/", baseRoutes);

// Register API routes for resources
app.use("/api", apiRoutes);

//handle 404 erorrs 
app.use(handleNotFound); 
export default app;
