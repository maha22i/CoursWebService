import { apiCoreError } from './api-core-error';

describe('apiCoreError', () => {
  it('should work', () => {
    expect(apiCoreError()).toEqual('api-core-error');
  });
});
