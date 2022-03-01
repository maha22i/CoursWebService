import {
  CreateValidationDtoFactory,
  ResetValidationDtoFactory,
  UpdateValidationDtoFactory,
} from '@courswebservice/api/validation/core';
import { IsObjectId } from '@courswebservice/api/validation/id';
import {
  AuthorCreateDto,
  AuthorDto,
  AuthorResetDto,
  AuthorUpdateDto,
} from '@courswebservice/common/resource/author';
import { IsString } from 'class-validator';

export class AuthorValidation implements AuthorDto {
  @IsObjectId() id: string;
  @IsString() firstName: string;
  @IsString() lastName: string;
}

export class AuthorCreateValidationDto
  extends CreateValidationDtoFactory(AuthorValidation)
  implements AuthorCreateDto {}
export class AuthorUpdateValidationDto
  extends UpdateValidationDtoFactory(AuthorValidation)
  implements AuthorUpdateDto {}
export class AuthorResetValidationDto
  extends ResetValidationDtoFactory(AuthorValidation)
  implements AuthorResetDto {}
