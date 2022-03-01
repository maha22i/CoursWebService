import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@courswebservice/common/resource/core';

export interface AuthorDto extends Dto {
  firstName: string;
  lastName: string;
}

export type AuthorCreateDto = CreateDto<AuthorDto>;
export type AuthorUpdateDto = UpdateDto<AuthorDto>;
export type AuthorResetDto = ResetDto<AuthorDto>;
