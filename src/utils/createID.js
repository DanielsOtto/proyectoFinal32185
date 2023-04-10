import { randomUUID } from 'crypto';

export function createID() {
  return randomUUID();
}