// import { apiRepositoryError } from './api-repository-error';

// describe('apiRepositoryError', () => {
//   it('should work', () => {
//     expect(apiRepositoryError()).toEqual('api-repository-error');
//   });
// });

import { ApiResourceNotFoundException } from '@courswebservice/api/core/error';
import {
  apiRepositoryError,
  handleDocumentNotFound,
} from './api-repository-error';
import { Error as MongooseError } from 'mongoose';

describe('apiRepositoryError', () => {
  describe('apiRepositoryError', () => {
    it('should work', () => {
      expect(apiRepositoryError()).toEqual('api-repository-error');
    });
  });

  describe('handleDocumentNotFound', () => {
    it('should throw ApiResourceNotFound error', () => {
      const errorInput = new MongooseError.DocumentNotFoundError('');

      try {
        handleDocumentNotFound(errorInput);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiResourceNotFoundException);
      }
    });

    it('should throw input error', () => {
      const errorInput = new Error();

      try {
        handleDocumentNotFound(errorInput);
      } catch (error) {
        expect(error).toBe(errorInput);
        expect(error).not.toBeInstanceOf(ApiResourceNotFoundException);
      }
    });
  });
});
