import { Document } from 'mongoose';
export function apiRepositoryCore(): string {
  return 'api-repository-core';
}
export type EntityWithId<TEntity> = TEntity & Pick<Document, 'id'>;
export type EntityDocument<TEntity> = TEntity & Document;
