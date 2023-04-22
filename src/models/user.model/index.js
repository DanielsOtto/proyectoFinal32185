import { User } from './user.model.js';

export default function createUserModel(object) {
  return new User(object);
}