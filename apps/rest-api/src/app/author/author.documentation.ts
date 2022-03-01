import {
  CreateDocumentationDtoFactory,
  ResetDocumentationDtoFactory,
  UpdateDocumentationDtoFactory,
} from '@courswebservice/api/documentation/core';
import {
  AuthorCreateDto,
  AuthorDto,
  AuthorResetDto,
  AuthorUpdateDto,
} from '@courswebservice/common/resource/author';
import { ApiProperty } from '@nestjs/swagger';

export const authorExample: AuthorDto = {
  id: '6214c0f2857cfb3569c19166',
  firstName: 'J.K',
  lastName: 'Rowling',
};

export class ApiAuthorDto implements AuthorDto {
  @ApiProperty({ example: authorExample.id }) id: string;
  @ApiProperty({ example: authorExample.firstName }) firstName: string;
  @ApiProperty({ example: authorExample.lastName }) lastName: string;
}

export class ApiAuthorCreateDto
  extends CreateDocumentationDtoFactory(ApiAuthorDto)
  implements AuthorCreateDto {}
export class ApiAuthorUpdateDto
  extends UpdateDocumentationDtoFactory(ApiAuthorDto)
  implements AuthorUpdateDto {}
export class ApiAuthorResetDto
  extends ResetDocumentationDtoFactory(ApiAuthorDto)
  implements AuthorResetDto {}
