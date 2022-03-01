import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@courswebservice/common/resource/core';
import { Type } from '@nestjs/common';
import {
  IntersectionType,
  MappedType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';

export function apiValidationCore(): string {
  return 'api-validation-core';
}

export function CreateValidationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<CreateDto<TDto>> {
  return OmitType(TValidationDto, ['id']);
}

export function UpdateValidationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<UpdateDto<TDto>> {
  return IntersectionType(
    PickType(TValidationDto, ['id']),
    PartialType(CreateValidationDtoFactory(TValidationDto))
  );
}

export function ResetValidationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<ResetDto<TDto>> {
  return UpdateValidationDtoFactory(TValidationDto);
}
