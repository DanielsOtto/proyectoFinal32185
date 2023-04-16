import { ProductList } from './product.repository.js';

const { mongoClient } = await import('../../database/mongoClient.js');
const { MongoDb } = await import('../../daos/mongodb.dao.js');

const productCollection = mongoClient.db().collection('products');
const daoMongoDb = new MongoDb(productCollection);

export const productList = new ProductList(daoMongoDb);