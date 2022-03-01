import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
const username = 'mahami';
const password = 'T5ubRfMoNTX9cETg';
const host = 'cluster0.ejvhm.mongodb.net';
const databaseName = 'library';
const mongoDbUri = `mongodb+srv://${username}:${password}@${host}/${databaseName}`;
// const mongoDbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
@Module({
  imports: [MongooseModule.forRoot(mongoDbUri), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
