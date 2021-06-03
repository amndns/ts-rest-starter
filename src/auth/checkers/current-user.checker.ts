import { Action } from 'routing-controllers';
import Customer from '../../api/customers/models/customer.model';

export function currentUserChecker(): (
  action: Action
) => Promise<Customer | undefined> {
  return async function innerCurrentCustomerChecker(
    action: Action
  ): Promise<Customer | undefined> {
    return action.request.user;
  };
}
