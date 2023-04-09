import express from 'express';
import mongoose from 'mongoose';
import { dbConfig } from './config/db.config';
import router from './routes/routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

mongoose.set('strictQuery', true);

const app = express();
app.use(bodyParser.json());
app.use('/', router);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(dbConfig.url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
