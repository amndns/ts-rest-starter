import { Logger, LoggerInterface } from '@amndns/service-utils/logger';
import * as express from 'express';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Environment, nodeEnv } from '../../../config';
import { ResponseStatus } from '../../../utils';

@Middleware({ type: 'after' })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(@Logger(__filename) private logger: LoggerInterface) {}

  public isProduction = nodeEnv === Environment.PRODUCTION;

  public error(
    error: HttpError,
    req: express.Request,
    res: express.Response
  ): void {
    res.status(error.httpCode || 500);

    if (error.httpCode === 400 && error['errors']) {
      // See https://github.com/typestack/class-validator#passing-options
      const message = Object.values(error['errors'][0]['constraints'])[0];
      res.json({
        status: ResponseStatus.ERROR,
        error_code: error.name,
        message,
      });
    } else {
      res.json({
        status: ResponseStatus.ERROR,
        error_code: error.name,
        message: error.message,
      });
    }

    if (this.isProduction) {
      this.logger.error(error.name, error.message);
    } else {
      this.logger.error(error.name, error.stack);
    }
  }
}
