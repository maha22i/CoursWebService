import { Dto } from '@courswebservice/common/resource/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';
import { PaginatedItems } from './paginated-items';

const HEADER_COUNT_NAME = 'X-Total-Count';

@Injectable()
export class PaginatedItemsInterceptor<TDto extends Dto>
  implements NestInterceptor<PaginatedItems<TDto>, TDto[]>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<TDto[]> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      tap(({ count }) => response.header(HEADER_COUNT_NAME, count)),
      map(({ items }) => items)
    );
  }
}
