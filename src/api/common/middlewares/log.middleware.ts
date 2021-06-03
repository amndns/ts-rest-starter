import { WinstonLogger } from '@amndns/service-utils/logger';
import * as express from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { logEnv } from '../../../config';

@Middleware({ type: 'before' })
@Service()
class LogMiddleware implements ExpressMiddlewareInterface {
  private logger = new WinstonLogger(__dirname);

  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return morgan(logEnv.output, {
      stream: {
        write: this.logger.info.bind(this.logger),
      },
    })(req, res, next);
  }
}

export default LogMiddleware;
