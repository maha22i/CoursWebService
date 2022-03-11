import {
  ApiException,
  ApiResourceTypeNotFoundException,
  ApiUnknownErrorException,
} from '@courswebservice/api/core/error';
import { ErrorDto } from '@courswebservice/common/resource/error';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

abstract class AbstractFilter<T extends Error> implements ExceptionFilter {
  protected abstract logger: Logger;
  protected abstract getApiException(exception: T): ApiException;

  catch(exception: T, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response<ErrorDto>>();
    const apiException = this.getApiException(exception);

    response.status(apiException.getStatus()).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: apiException.getStatus(),
      code: apiException.options.code,
      message: apiException.options.message,
      details: apiException.options.details,
    });

    this.logger.error(exception?.stack || exception);
  }
}

@Catch()
export class ErrorFilter extends AbstractFilter<Error> {
  protected logger = new Logger(ErrorFilter.name);

  protected getApiException(): ApiException {
    return new ApiUnknownErrorException();
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends AbstractFilter<NotFoundException> {
  protected logger = new Logger(NotFoundExceptionFilter.name);

  protected getApiException(): ApiException {
    return new ApiResourceTypeNotFoundException();
  }
}

@Catch(ApiException)
export class ApiExceptionFilter extends AbstractFilter<ApiException> {
  protected logger = new Logger(ApiExceptionFilter.name);

  protected getApiException(exception: ApiException): ApiException {
    return exception;
  }
}
