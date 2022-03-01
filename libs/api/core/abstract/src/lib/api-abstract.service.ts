import { EntityDocument } from '@courswebservice/api/repository/core';
import { handleDocumentNotFound } from '@courswebservice/api/repository/error';
import {
  CreateDto,
  ResetDto,
  UpdateDto,
  Dto,
} from '@courswebservice/api/repository/core';
import { ApiAbstractMapper } from '..';
import { Model } from 'mongoose';
export abstract class ApiAbstractService<
  TEntity,
  TDto extends Dto,
  TDocument = EntityDocument<TEntity>,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
> {
  protected constructor(
    protected mapper: ApiAbstractMapper<
      TEntity,
      TDto,
      TDocument,
      TCreateDto,
      TUpdateDto,
      TResetDto
    >,
    protected model: Model<TDocument>
  ) {}

  create(dto: TCreateDto): Promise<TDto> {
    const entity = this.mapper.mapCreateDtoToEntity(dto);
    return this.model
      .create(entity)
      .then((document) => this.mapper.mapDocumentToDto(document));
  }

  findAll(): Promise<TDto[]> {
    return this.model
      .find()
      .exec()
      .then((documents) => this.mapper.mapDocumentsToDtos(documents));
  }

  findOne(id: string): Promise<TDto> {
    return this.model
      .findById(id)
      .orFail()
      .exec()
      .then((document) => this.mapper.mapDocumentToDto(document))
      .catch(handleDocumentNotFound);
  }

  update(dto: TUpdateDto): Promise<TDto> {
    const entity = this.mapper.mapUpdateDtoToEntity(dto);
    return this.model
      .findByIdAndUpdate(entity.id, entity, { new: true })
      .orFail()
      .exec()
      .then((document) => this.mapper.mapDocumentToDto(document))
      .catch(handleDocumentNotFound);
  }

  reset(dto: TResetDto): Promise<TDto> {
    const entity = this.mapper.mapResetDtoToEntity(dto);
    return this.model
      .findByIdAndUpdate(entity.id, entity, { new: true })
      .orFail()
      .exec()
      .then((document) => this.mapper.mapDocumentToDto(document))
      .catch(handleDocumentNotFound);
  }

  remove(id: string): Promise<void> {
    return this.model
      .deleteOne({ _id: id })
      .orFail()
      .exec()
      .then(() => null)
      .catch(handleDocumentNotFound);
  }
}
