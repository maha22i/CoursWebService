import { ApiResourceIdInvalidException } from '@courswebservice/api/core/error';

import { Types } from 'mongoose';
export const isObjectId = (value: string): boolean =>
  Types.ObjectId.isValid(value);
export const checkObjectId = (value: string): string => {
  if (isObjectId(value)) {
    return value;
  }
  throw new ApiResourceIdInvalidException();
};
