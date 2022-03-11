import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookEntity, BookSchema } from './book.entity';
import { BookMapper } from './book.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookEntity.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookMapper],
})
export class BookModule {}
