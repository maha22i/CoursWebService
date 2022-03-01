import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@courswebservice/common/resource/core';

export interface BookDto extends Dto {
  id: string;
  title: string;
  summary: string;
  publicationDate: string;
  likeCount: number;
}

export type BookCreateDto = CreateDto<BookDto>;
export type BookUpdateDto = UpdateDto<BookDto>;
export type BookResetDto = ResetDto<BookDto>;
