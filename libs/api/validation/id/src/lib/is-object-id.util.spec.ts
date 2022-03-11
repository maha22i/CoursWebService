import { ApiResourceIdInvalidException } from '@courswebservice/api/core/error';
import { checkObjectId } from './is-object-id.util';

describe('isObjectIdUtil', () => {
  describe('checkObjectId', () => {
    
    it('should return input value', () => {
      const objectId = '6214c0f2857cfb3569c19166';

      const result = checkObjectId(objectId);

      expect(result).toBe(objectId);
    });

    it('should throw an error', () => {
      const objectId = 'bad-object-id';

      try {
        checkObjectId(objectId);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiResourceIdInvalidException);
      }
    });
  });
});
