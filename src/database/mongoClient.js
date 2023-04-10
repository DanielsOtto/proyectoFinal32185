import { MongoClient } from 'mongodb';
import { MONGO_CNS } from '../config/config.js';

const mongoClient = new MongoClient(MONGO_CNS);

await mongoClient.connect();

export { mongoClient };