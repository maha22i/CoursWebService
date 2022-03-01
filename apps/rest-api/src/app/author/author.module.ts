import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorEntity, AuthorSchema } from './author.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorMapper } from './author.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthorEntity.name,
        schema: AuthorSchema,
      },
    ]),
  ],

  controllers: [AuthorController],
  providers: [AuthorService, AuthorMapper],
})
export class AuthorModule {}
