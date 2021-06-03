import { WinstonLogger } from '@amndns/service-utils/logger';
import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { AuthService } from '../services/auth.service';

export function authorizationChecker(): (
  action: Action,
  roles: any[]
) => Promise<boolean> | boolean {
  const log = new WinstonLogger(__filename);
  const authService = Container.get<AuthService>(AuthService);

  return async function innerAuthorizationChecker(
    action: Action
  ): Promise<boolean> {
    const credentials = authService.parseBasicAuthFromRequest(action.request);

    if (credentials === undefined) {
      log.warn('No credentials given.');
      return false;
    }

    action.request.user = await authService.validateCustomer(
      credentials.username,
      credentials.password
    );

    if (action.request.user === undefined) {
      log.warn('Invalid credentials given.');
      return false;
    }

    log.info('Successfully checked credentials.');
    return true;
  };
}
