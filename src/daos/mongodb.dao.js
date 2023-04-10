import { logger } from '../config/pino.js';
// FALTA MANEJO DE ERRORES

export class MongoDb {
  #collection;
  constructor(collection) {
    this.#collection = collection;
  }

  async save(dto) {
    try {
      const result = await this.#collection.insertOne(dto);
      console.log(result); // REVISAR
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      const dtos = await this.#collection.find().toArray();
      if (!dtos) throw new 'error coleccion vacia'
      //manejo de errores
      return dtos;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#collection.findOne({ id }); // id: id ?
      if (!dto) throw new 'id no encontrado'
      //manejo de errores
      return dto;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateById(id, dto) {
    try {
      const result = await this.#collection.replaceOne({ id }, dto);
      if (!result.acknoledged) throw new 'error al actualizar'
      if (result.matchedCount === 0) throw new 'id no encontrado'
      if (result.modifiedCount === 0) 'no se modifico nada'
      //manejo de errores
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.#collection.deleteOne({ id });
      if (!result.acknoledged) 'error al eliminar'
      if (result.matchedCount === 0) 'no se encontro el ID'
      if (result.deletedCount === 0) 'no se elimino nada'
      //manejo de errores
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteAll() {
    try {
      const result = await this.#collection.deleteMany({});
      if (!result.acknoledged) 'error al eliminar'
      if (result.deletedCount === 0) 'no se elimino nada'
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}