import { UserList } from './user.repository.js';

const { mongoClient } = await import('../../database/mongoClient.js');
const { MongoDb } = await import('../../daos/mongodb.dao.js');

const userCollection = mongoClient.db().collection('users');
const daoMongoDb = new MongoDb(userCollection);

export const userList = new UserList(daoMongoDb);