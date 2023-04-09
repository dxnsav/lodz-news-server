import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env'), debug: true });


const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseName = process.env.MONGO_DB_NAME;

console.log("username", process.env.MONGO_DB_USERNAME);

export const dbConfig = {
  url: `mongodb+srv://${username}:${password}@cluster0.lbip9ob.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
};
