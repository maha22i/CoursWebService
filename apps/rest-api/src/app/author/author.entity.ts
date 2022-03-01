import {
  EntityDocument,
  EntityWithId,
} from '@courswebservice/api/repository/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'authors' })
export class AuthorEntity {
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
}

export type AuthorEntityWithId = EntityWithId<AuthorEntity>;
export type AuthorDocument = EntityDocument<AuthorEntity>;
export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity);
