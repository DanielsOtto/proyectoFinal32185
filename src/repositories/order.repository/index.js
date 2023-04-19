import { OrderList } from './order.repository.js';

const { mongoClient } = await import('../../database/mongoClient.js');
const { MongoDb } = await import('../../daos/mongodb.dao.js');

const orderCollection = mongoClient.db().collection('orders');
const daoMongoDb = new MongoDb(orderCollection);
const orderList = new OrderList(daoMongoDb);

export default orderList;