import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@courswebservice/common/resource/core';
import { Type } from '@nestjs/common';
import { MappedType } from '@nestjs/mapped-types';
import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';

export function apiDocumentationCore(): string {
  return 'api-documentation-core';
}

export function CreateDocumentationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<CreateDto<TDto>> {
  return OmitType(TValidationDto, ['id']);
}

export function UpdateDocumentationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<UpdateDto<TDto>> {
  return IntersectionType(
    PickType(TValidationDto, ['id']),
    PartialType(CreateDocumentationDtoFactory(TValidationDto))
  );
}

export function ResetDocumentationDtoFactory<TDto extends Dto>(
  TValidationDto: Type<TDto>
): MappedType<ResetDto<TDto>> {
  return UpdateDocumentationDtoFactory(TValidationDto);
}
