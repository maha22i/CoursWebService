import {
  CreateDocumentationDtoFactory,
  ResetDocumentationDtoFactory,
  UpdateDocumentationDtoFactory,
} from '@courswebservice/api/documentation/core';
import {
  BookCreateDto,
  BookDto,
  BookResetDto,
  BookUpdateDto,
} from '@courswebservice/common/resource/book';
import { ApiProperty } from '@nestjs/swagger';

export const bookExample: BookDto = {
  id: '620e13f40b1b73d0b316dfe7',
  title: 'HARRY POTTE VOLUME 5',
  summary: "HARRY POTTER ET L'ORDRE DU PHÉNIX J.K. ROWLING",
  publicationDate: new Date('2017-02-01').toISOString(),
  likeCoun: 100,
};

export class ApiBookDto implements BookDto {
  likeCoun: number;
  @ApiProperty({ example: bookExample.id, type: String, pattern: '^[a-f0-]' })
  id: string;
  @ApiProperty({ example: bookExample.title, type: String }) title: string;
  @ApiProperty({ example: bookExample.summary, type: String, required: false })
  summary: string;
  @ApiProperty({
    example: bookExample.publicationDate,
    type: String,
    format: 'date-time',
  })
  publicationDate: string;
  @ApiProperty({ example: bookExample.likeCoun, type: Number, minimum: 0 })
  Likecon: number;
}

export class ApiBookCreateDto
  extends CreateDocumentationDtoFactory(ApiBookDto)
  implements BookCreateDto {}
export class ApiBookUpdateDto
  extends UpdateDocumentationDtoFactory(ApiBookDto)
  implements BookUpdateDto {}
export class ApiBookResetDto
  extends ResetDocumentationDtoFactory(ApiBookDto)
  implements BookResetDto {}
