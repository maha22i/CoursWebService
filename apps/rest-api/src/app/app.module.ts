import { Module, ValidationPipe } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorModule } from './author/author.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  ApiExceptionFilter,
  ErrorFilter,
  NotFoundExceptionFilter,
} from './api-exception.filter';
import { mongoDbUri } from './database.util';

@Module({
  imports: [MongooseModule.forRoot(mongoDbUri), BookModule, AuthorModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule {}
