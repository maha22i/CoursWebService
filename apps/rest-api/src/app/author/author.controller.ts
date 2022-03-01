import { ApiAbstractControllerFactory } from '@courswebservice/api/core/abstract';
import {
  AuthorDto,
  resourceAuthorPath,
} from '@courswebservice/common/resource/author';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiAuthorCreateDto,
  ApiAuthorDto,
  ApiAuthorResetDto,
  ApiAuthorUpdateDto,
  authorExample,
} from './author.documentation';
import { AuthorEntity } from './author.entity';
import { AuthorService } from './author.service';
import {
  AuthorCreateValidationDto,
  AuthorResetValidationDto,
  AuthorUpdateValidationDto,
} from './author.validation';

@ApiTags(resourceAuthorPath)
@Controller(resourceAuthorPath)
export class AuthorController extends ApiAbstractControllerFactory<
  AuthorEntity,
  AuthorDto
>({
  ValidationCreateDtoClass: AuthorCreateValidationDto,
  ValidationUpdateDtoClass: AuthorUpdateValidationDto,
  ValidationResetDtoClass: AuthorResetValidationDto,
  DocumentationDtoClass: ApiAuthorDto,
  DocumentationCreateDtoClass: ApiAuthorCreateDto,
  DocumentationUpdateDtoClass: ApiAuthorUpdateDto,
  DocumentationResetDtoClass: ApiAuthorResetDto,
  example: authorExample,
}) {
  constructor(service: AuthorService) {
    super(service);
  }
}
