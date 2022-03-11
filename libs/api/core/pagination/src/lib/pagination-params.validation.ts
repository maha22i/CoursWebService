import { PaginationParams } from '@courswebservice/common/resource/core';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationParamsValidation implements PaginationParams {
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) page?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) size?: number;
}
