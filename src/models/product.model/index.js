import { Product } from "./product.model.js";

export default function createProductModel(object) {
  return new Product(object);
}