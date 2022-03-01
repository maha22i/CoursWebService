import { ApiAbstractService } from '@courswebservice/api/core/abstract';
import { EntityDocument } from '@courswebservice/api/repository/core';
import { IsObjectIdPipe } from '@courswebservice/api/validation/id';
import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@courswebservice/common/resource/core';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

interface AbstractControllerOptions<
  TEntity,
  TDto extends Dto,
  TDocument = EntityDocument<TEntity>,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
> {
  ValidationCreateDtoClass: Type<TCreateDto>;
  ValidationUpdateDtoClass: Type<TUpdateDto>;
  ValidationResetDtoClass: Type<TResetDto>;
  DocumentationDtoClass: Type<TDto>;
  DocumentationCreateDtoClass: Type<TCreateDto>;
  DocumentationUpdateDtoClass: Type<TUpdateDto>;
  DocumentationResetDtoClass: Type<TResetDto>;
  example: TDto;
}

interface ApiController<
  TEntity,
  TDto extends Dto,
  TDocument = EntityDocument<TEntity>,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
> {
  create(dto: TCreateDto);
  findAll(): Promise<TDto[]>;
  findOne(id: string): Promise<TDto>;
  update(id: string, dto: TUpdateDto): Promise<TDto>;
  reset(id: string, dto: TResetDto): Promise<TDto>;
  remove(id: string): Promise<void>;
}

export function ApiAbstractControllerFactory<
  TEntity,
  TDto extends Dto,
  TDocument = EntityDocument<TEntity>,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
>(
  options: AbstractControllerOptions<
    TEntity,
    TDto,
    TDocument,
    TCreateDto,
    TUpdateDto,
    TResetDto
  >
): new (
  service: ApiAbstractService<
    TEntity,
    TDto,
    TDocument,
    TCreateDto,
    TUpdateDto,
    TResetDto
  >
) => ApiController<
  TEntity,
  TDto,
  TDocument,
  TCreateDto,
  TUpdateDto,
  TResetDto
> {
  class ApiAbstractController<
    TEntity,
    TDto extends Dto,
    TDocument = EntityDocument<TEntity>,
    TCreateDto = CreateDto<TDto>,
    TUpdateDto = UpdateDto<TDto>,
    TResetDto = ResetDto<TDto>
  > {
    constructor(
      protected service: ApiAbstractService<
        TEntity,
        TDto,
        TDocument,
        TCreateDto,
        TUpdateDto,
        TResetDto
      >
    ) {}

    @Post()
    @ApiBody({ type: options.DocumentationCreateDtoClass })
    @ApiCreatedResponse({ type: options.DocumentationDtoClass })
    @ApiBadRequestResponse()
    create(
      @Body(
        new ValidationPipe({ expectedType: options.ValidationCreateDtoClass })
      )
      dto: TCreateDto
    ): Promise<TDto> {
      return this.service.create(dto);
    }

    @Get()
    @ApiOkResponse({ type: [options.DocumentationDtoClass] })
    findAll(): Promise<TDto[]> {
      return this.service.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiOkResponse({ type: options.DocumentationDtoClass })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    findOne(@Param('id', IsObjectIdPipe) id: string): Promise<TDto> {
      return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiBody({ type: options.DocumentationUpdateDtoClass })
    @ApiOkResponse({ type: options.DocumentationDtoClass })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    update(
      @Param('id', IsObjectIdPipe) id: string,
      @Body(
        new ValidationPipe({ expectedType: options.ValidationUpdateDtoClass })
      )
      dto: TUpdateDto
    ): Promise<TDto> {
      return this.service.update({ ...dto, id });
    }

    @Put(':id')
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiBody({ type: options.DocumentationResetDtoClass })
    @ApiOkResponse({ type: options.DocumentationDtoClass })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    reset(
      @Param('id', IsObjectIdPipe) id: string,
      @Body(
        new ValidationPipe({ expectedType: options.ValidationResetDtoClass })
      )
      dto: TResetDto
    ): Promise<TDto> {
      return this.service.reset({ ...dto, id });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiNoContentResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    remove(@Param('id', IsObjectIdPipe) id: string): Promise<void> {
      return this.service.remove(id);
    }
  }

  return ApiAbstractController;
}
