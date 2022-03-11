import {
  ApiException,
  ApiInvalidExceptionDetail,
  ApiQueryParamsSendInvalidException,
  ApiResourceSendInvalidException,
} from '@courswebservice/api/core/error';
import {
  PaginatedItems,
  PaginatedItemsInterceptor,
  PaginationMappedParams,
  PaginationParamsValidation,
} from '@courswebservice/api/core/pagination';
import { EntityDocument } from '@courswebservice/api/repository/core';
import { IsObjectIdPipe } from '@courswebservice/api/validation/id';
import { PaginationMappedParamsPipe } from '@courswebservice/api/validation/pagination';
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
  Query,
  Type,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ApiAbstractService } from './api-abstract.service';

const validationErrorsToInvalidExceptionDetails = (
  errors: ValidationError[]
): ApiInvalidExceptionDetail[] => {
  return errors.map((error) => {
    return {
      property: error.property,
      errorMessages: Object.values(error.constraints),
    };
  });
};

const resourceExceptionFactory = (errors: ValidationError[]): ApiException => {
  const details = validationErrorsToInvalidExceptionDetails(errors);
  return new ApiResourceSendInvalidException(details);
};
const queryParamsExceptionFactory = (
  errors: ValidationError[]
): ApiException => {
  const details = validationErrorsToInvalidExceptionDetails(errors);
  return new ApiQueryParamsSendInvalidException(details);
};

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
  findPage(params: PaginationMappedParams): Observable<PaginatedItems<TDto>>;
  findOne(id: string): Observable<TDto>;
  update(id: string, dto: TUpdateDto): Observable<TDto>;
  reset(id: string, dto: TResetDto): Observable<TDto>;
  remove(id: string): Observable<void>;
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
        new ValidationPipe({
          expectedType: options.ValidationCreateDtoClass,
          exceptionFactory: resourceExceptionFactory,
        })
      )
      dto: TCreateDto
    ): Observable<TDto> {
      return this.service.create(dto);
    }

    @Get()
    @UseInterceptors(PaginatedItemsInterceptor)
    @ApiQuery({ name: 'page', type: 'integer', example: 0 })
    @ApiQuery({ name: 'size', type: 'integer', example: 10 })
    @ApiOkResponse({ type: [options.DocumentationDtoClass] })
    findPage(
      @Query(
        new ValidationPipe({
          transform: true,
          expectedType: PaginationParamsValidation,
          exceptionFactory: queryParamsExceptionFactory,
        }),
        PaginationMappedParamsPipe
      )
      { skip, limit }: PaginationMappedParams
    ): Observable<PaginatedItems<TDto>> {
      return this.service.findPage(skip, limit);
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiOkResponse({ type: options.DocumentationDtoClass })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    findOne(@Param('id', IsObjectIdPipe) id: string): Observable<TDto> {
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
        new ValidationPipe({
          expectedType: options.ValidationUpdateDtoClass,
          exceptionFactory: resourceExceptionFactory,
        })
      )
      dto: TUpdateDto
    ): Observable<TDto> {
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
        new ValidationPipe({
          expectedType: options.ValidationResetDtoClass,
          exceptionFactory: resourceExceptionFactory,
        })
      )
      dto: TResetDto
    ): Observable<TDto> {
      return this.service.reset({ ...dto, id });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiParam({ name: 'id', example: options.example.id })
    @ApiNoContentResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    remove(@Param('id', IsObjectIdPipe) id: string): Observable<void> {
      return this.service.remove(id);
    }
  }

  return ApiAbstractController;
}
