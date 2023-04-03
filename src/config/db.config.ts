import * as Mongoose from 'mongoose';
import { dotenv } from 'dotenv';

dotenv.config();

let db: Mongoose.Connection;

export const connect = () => {
  const uri = process.env.MONGODB_URI;
  console.log('from connect: process.env.MONGO_CONNECTION_STRING :::', process.env.MONGODB_URI);

  if (db) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  db = Mongoose.connection;

  db.once('open', async () => {
    console.log('Connected to database');
  });

  db.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!db) {
    return;
  }

  Mongoose.disconnect();

  db.once('close', () => {
    console.log('Disconnected from database');
  });
};
