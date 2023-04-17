import { CartList } from './cart.repository.js';

const { mongoClient } = await import('../../database/mongoClient.js');
const { MongoDb } = await import('../../daos/mongodb.dao.js');

const cartCollection = mongoClient.db().collection('carts');
const daoMongoDb = new MongoDb(cartCollection);
const cartList = new CartList(daoMongoDb);

export default cartList;