import { logger } from '../config/pino.js';
import { UnsavedObject } from '../errors/UnsavedObject.js';
import { EmptyCollection } from '../errors/EmptyCollection.js';
import { IdNotFoundError } from '../errors/IdNotFoundError.js';
import { ObjectNotUpdated } from '../errors/ObjectNotUpdated.js';
import { ObjectNotDeleted } from '../errors/ObjectNotDeleted.js';
import { EmailAlreadyRegisterError } from '../errors/EmailAlreadyRegister.js';

export class MongoDb {
  #collection;
  constructor(collection) {
    this.#collection = collection;
  }

  async save(dto) {
    try {
      const result = await this.#collection.insertOne(dto);
      if (!result.acknowledged) throw new UnsavedObject(dto);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      const dtos = await this.#collection.find().toArray();
      if (!dtos) throw new EmptyCollection(dtos);
      return dtos;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getById(id) {
    try {
      const dto = await this.#collection.findOne({ id: id });
      if (!dto) throw new IdNotFoundError(id);
      return dto;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findByEmail(email, validate = true) {
    try {
      const user = await this.#collection.findOne({ email: email });

      if (validate) {
        if (user && user.hasOwnProperty('email')) throw new EmailAlreadyRegisterError(email);
      }
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateById(id, dto) {
    try {
      const result = await this.#collection.replaceOne({ id }, dto);
      if (!result.acknowledged) throw new ObjectNotUpdated(dto.name);
      if (result.matchedCount === 0) throw new IdNotFoundError(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.#collection.deleteOne({ id });
      if (!result.acknowledged) throw new ObjectNotDeleted(result);
      if (result.matchedCount === 0) throw new IdNotFoundError(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteAll() {
    try {
      const result = await this.#collection.deleteMany({});
      if (!result.acknowledged) throw new ObjectNotDeleted({ objects: 'all' });
      if (result.deletedCount === 0) throw new IdNotFoundError(id);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}