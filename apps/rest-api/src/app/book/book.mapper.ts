import { ApiAbstractMapper } from '@courswebservice/api/core/abstract';
import {
  BookCreateDto,
  BookDto,
  BookResetDto,
  BookUpdateDto,
} from '@courswebservice/common/resource/book';

import { Injectable } from '@nestjs/common';
// import { AbstractMapper } from '../abstract/abstract.mapper';
import { BookDocument, BookEntity, BookEntityWithId } from './book.entity';

export const bookDocumentToDto = (document: BookDocument): BookDto => ({
  id: document.id,
  title: document.title,
  summary: document.description,
  publicationDate: document.publication?.toISOString(),
  Likecon: document.Likecon,
});

export const bookCreateDtoToEntity = (dto: BookCreateDto): BookEntity => ({
  title: dto.title,
  description: dto.summary,
  publication: dto.publicationDate && new Date(dto.publicationDate),
  Likecon: dto.Likecon,
});

export const bookUpdateDtoToEntity = (
  dto: BookUpdateDto
): BookEntityWithId => ({
  id: dto.id,
  title: dto.title,
  description: dto.summary,
  publication: dto.publicationDate && new Date(dto.publicationDate),
  Likecon: dto.Likecon,
});

export const bookResetDtoToEntity = (dto: BookUpdateDto): BookEntityWithId => ({
  id: dto.id,
  title: dto.title ?? null,
  description: dto.summary ?? null,
  publication: dto.publicationDate ? new Date(dto.publicationDate) : null,
  Likecon: dto.Likecon ?? null,
});

@Injectable()
export class BookMapper extends ApiAbstractMapper<BookEntity, BookDto> {
  mapDocumentToDto(Document: BookDocument): BookDto {
    return bookDocumentToDto(Document);
  }
  mapCreateDtoToEntity(dto: BookCreateDto): BookEntity {
    return bookCreateDtoToEntity(dto);
  }
  mapUpdateDtoToEntity(dto: BookUpdateDto): BookEntityWithId {
    return bookUpdateDtoToEntity(dto);
  }
  mapResetDtoToEntity(dto: BookResetDto): BookEntityWithId {
    return bookResetDtoToEntity(dto);
  }
}
