import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseName = process.env.MONGO_DB_NAME;

export const dbConfig = {
  url: `mongodb+srv://${username}:${password}@cluster0.lbip9ob.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
};
