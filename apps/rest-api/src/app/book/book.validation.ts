import {
  CreateValidationDtoFactory,
  ResetValidationDtoFactory,
  UpdateValidationDtoFactory,
} from '@courswebservice/api/validation/core';
import { IsObjectId } from '@courswebservice/api/validation/id';
import {
  BookCreateDto,
  BookDto,
  BookResetDto,
  BookUpdateDto,
} from '@courswebservice/common/resource/book';

import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class BookValidationDto implements BookDto {
  likeCount: number;
  @IsObjectId() id: string;
  @IsString() title: string;
  @IsString() @IsOptional() @MinLength(10) summary: string;
  @IsDateString() publicationDate: string;
  @IsInt() @Min(0) Likecon: number;
}

export class BookCreateValidationDto
  extends CreateValidationDtoFactory(BookValidationDto)
  implements BookCreateDto {}
export class BookUpdateValidationDto
  extends UpdateValidationDtoFactory(BookValidationDto)
  implements BookUpdateDto {}
export class BookResetValidationDto
  extends ResetValidationDtoFactory(BookValidationDto)
  implements BookResetDto {}
