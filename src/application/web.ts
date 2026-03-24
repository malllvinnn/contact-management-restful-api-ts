import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middlerware';
import { apiRouter } from '../route/api';
import cors from "cors";

export const web = express();
web.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);