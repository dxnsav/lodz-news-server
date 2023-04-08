import express from 'express';
import mongoose from 'mongoose';
import { dbConfig } from './src/config/db.config';
import router from './src/routes/routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

const app = express();
app.use(bodyParser.json());
app.use('/', router);

const PORT = process.env.PORT || 4000;
console.log('PORT:', PORT);

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
