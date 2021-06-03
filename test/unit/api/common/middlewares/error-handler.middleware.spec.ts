import MockExpressResponse from 'mock-express-response';
import { BadRequestError, HttpError } from 'routing-controllers';
import { ErrorHandlerMiddleware } from '../../../../../src/api/common/middlewares/error-handler.middleware';
import LogMock from './log.middleware.mock';

describe('ErrorHandlerMiddleware', () => {
  let logger: LogMock;
  let middleware: ErrorHandlerMiddleware;
  let err: HttpError;
  let res: MockExpressResponse;

  beforeEach(() => {
    logger = new LogMock();
    middleware = new ErrorHandlerMiddleware(logger);
    res = new MockExpressResponse();
  });

  it('Should handle the special validation error code 400', () => {
    err = new BadRequestError('Test Error');
    err[`errors`] = [
      {
        target: 'Test Target',
        property: 'Test Property',
        value: 'Test Value',
        constraints: {
          isNotEmpty: 'Must have fields: ...',
        },
      },
    ];
    middleware.error(err, undefined, res);
    const json = res._getJSON();

    expect(json.error_code).toBe(err.name);
    expect(json.message).toBe('Must have fields: ...');
  });

  it('Should handle other error codes and not print stack out in production', () => {
    err = new HttpError(500, 'Test Server Error');
    middleware.isProduction = true;
    middleware.error(err, undefined, res);
    const json = res._getJSON();

    expect(json.error_code).toBe(err.name);
    expect(json.message).toBe(err.message);
    expect(logger.errorMock).toHaveBeenCalledWith(err.name, [err.message]);
  });

  it('Should handle other error codes and print stack out in development', () => {
    err = new HttpError(500, 'Test Server Error');
    middleware.isProduction = false;
    middleware.error(err, undefined, res);
    const json = res._getJSON();

    expect(json.error_code).toBe(err.name);
    expect(json.message).toBe(err.message);
    expect(logger.errorMock).toHaveBeenCalled();
  });
});
