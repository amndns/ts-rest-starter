import { classToPlain, Exclude, Expose } from 'class-transformer';
import { controllerResponse, ResponseStatus } from '../../../src/utils';

class SampleData {
  public stringData: string;
  public sensitiveData: string;
}

class SampleTransformedData {
  @Expose({ name: 'string_data', toPlainOnly: true })
  public stringData: string;

  @Exclude()
  public sensitiveData: string;
}

describe('utils/utils', () => {
  describe('controllerResponse', () => {
    it('Should transform the promise result and append a status key-value pair', async (done) => {
      const sampleData = new SampleData();
      sampleData.stringData = 'test';
      sampleData.sensitiveData = 'token';

      const promise = new Promise<SampleData>((resolve) => resolve(sampleData));
      const response = await controllerResponse(SampleTransformedData, promise);

      expect(classToPlain(response)).toStrictEqual({
        status: ResponseStatus.SUCCESS,
        result: { string_data: 'test' },
      });
      done();
    });
  });
});
