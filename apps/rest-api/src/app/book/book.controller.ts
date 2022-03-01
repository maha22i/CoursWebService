import { ApiAbstractControllerFactory } from '@courswebservice/api/core/abstract';
import {
  BookDto,
  resourceBookPath,
} from '@courswebservice/common/resource/book';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBookCreateDto,
  ApiBookDto,
  ApiBookResetDto,
  ApiBookUpdateDto,
  bookExample,
} from './book.documentation';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import {
  BookCreateValidationDto,
  BookResetValidationDto,
  BookUpdateValidationDto,
} from './book.validation';

@ApiTags(resourceBookPath)
@Controller(resourceBookPath)
export class BookController extends ApiAbstractControllerFactory<
  BookEntity,
  BookDto
>({
  ValidationCreateDtoClass: BookCreateValidationDto,
  ValidationUpdateDtoClass: BookUpdateValidationDto,
  ValidationResetDtoClass: BookResetValidationDto,
  DocumentationDtoClass: ApiBookDto,
  DocumentationCreateDtoClass: ApiBookCreateDto,
  DocumentationUpdateDtoClass: ApiBookUpdateDto,
  DocumentationResetDtoClass: ApiBookResetDto,
  example: bookExample,
}) {
  constructor(service: BookService) {
    super(service);
  }
}
