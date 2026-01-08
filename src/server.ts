import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import tripRouter from './routes/tripRoutes';
import app from './app';
import './models';
import sequelize from "./db/config/sequelize";
import { seedBusStops } from "./seeders/busstopseeder";
import authRoutes from './routes/authRoutes';



dotenv.config();

const server: Application = express();

app.use(cors());
app.use(express.json());

app.use('/trips', tripRouter);
app.use('/auth', authRoutes)
const PORT = process.env.PORT || 3000;


 const start = async () => {
  try {
      await sequelize.authenticate();
      console.log('Database connected');
      await sequelize.sync({ alter: true });
      await seedBusStops();

      app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

return
}
start();

