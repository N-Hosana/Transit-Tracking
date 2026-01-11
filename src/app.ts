import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./Middlewares/Errorhandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import busStopRoutes from "./routes/BusstopRoutes";
import adminBusRoutes from './routes/AdminBusRoutes';
import tripRoutes from './routes/tripRoutes';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transit Tracking API",
      version: "1.0.0",
      description: "API for tracking buses, routes, and managing trips in Rwanda",
    },
    servers: [
      {
        url: "http://localhost:3000",
        },
     
    ],
  },
  apis: ["./src/routes/*.ts"], 
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/busstops", busStopRoutes);
app.use("/api/users", userRoutes);
app.use('/admin', adminBusRoutes);
app.use('/trips', tripRoutes);

app.use(errorHandler);

export default app;