import express, { Application } from "express";
import cors from "cors";
import CorsOptions from "./config/cors";
import dotenv from "dotenv"

dotenv.config()

const app: Application = express();

app.use(express.json());

app.use(cors(CorsOptions));

export default app; 
