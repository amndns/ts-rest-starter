import { WinstonLogger } from '@amndns/service-utils/logger';
import { createExpressServer } from 'routing-controllers';
import { authorizationChecker } from '../auth/checkers/authorization.checker';
import { currentUserChecker } from '../auth/checkers/current-user.checker';
import { appEnv, dirsEnv } from '../config';

const expressLoader = (): void => {
  const logger = new WinstonLogger(__filename);

  const { host, port, routePrefix } = appEnv;
  const { controllers, middlewares } = dirsEnv;

  const app = createExpressServer({
    cors: true,
    classTransformer: true,
    defaultErrorHandler: false,
    validation: {
      forbidUnknownValues: true,
      stopAtFirstError: true,
    },
    routePrefix,
    controllers,
    middlewares,
    authorizationChecker: authorizationChecker(),
    currentUserChecker: currentUserChecker(),
  });

  app.listen(port, () => {
    logger.info(`REST Server running at ${host}:${port}.`);
  });
};

export default expressLoader;
