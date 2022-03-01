import { ApiAbstractService } from '@courswebservice/api/core/abstract';
import { AuthorDto } from '@courswebservice/common/resource/author';
import { Injectable } from '@nestjs/common';
import { AuthorDocument, AuthorEntity } from './author.entity';
import { AuthorMapper } from './author.mapper';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
// import { CreateAuthorDto } from './dto/create-author.dto';
// import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService extends ApiAbstractService<AuthorEntity, AuthorDto> {
  constructor(
    mapper: AuthorMapper,
    @InjectModel(AuthorEntity.name) model: Model<AuthorDocument>
  ) {
    super(mapper, model);
  }
}
