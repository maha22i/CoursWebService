import { EntityDocument } from '@library/api/repository/core';
import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@library/common/resource/core';
import { Document } from 'mongoose';

export abstract class ApiAbstractMapper<
  TEntity,
  TDto extends Dto,
  TDocument = EntityDocument<TEntity>,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
> {
  abstract mapDocumentToDto(document: TDocument): TDto;
  abstract mapCreateDtoToEntity(dto: TCreateDto): TEntity;
  abstract mapUpdateDtoToEntity(dto: TUpdateDto): Pick<Document, 'id'>;
  abstract mapResetDtoToEntity(dto: TResetDto): Pick<Document, 'id'>;

  mapDocumentsToDtos(documents: TDocument[]): TDto[] {
    return documents.map((document) => this.mapDocumentToDto(document));
  }
}
