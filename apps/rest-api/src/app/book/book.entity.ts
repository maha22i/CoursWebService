import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'books' })
export class BookEntity {
  static collectionName = 'books';
  @Prop({ required: true }) title: string;
  @Prop() description: string;
  @Prop({ required: true, type: Date }) publication: Date;
  @Prop() Likecon: number;
}

export type BookEntityWithId = BookEntity & Pick<Document, 'id'>;

export type BookDocument = BookEntity & Document;

export const BookSchema = SchemaFactory.createForClass(BookEntity);
