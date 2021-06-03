import { EntityRepository, In, Repository } from 'typeorm';
import Customer from '../models/customer.model';
import {
  CustomersGetFilter,
  CustomersGetProjection,
} from '../models/customers.backend-model';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async getCustomers(
    filter: CustomersGetFilter,
    projection: CustomersGetProjection
  ): Promise<Customer[]> {
    return await this.find({
      select: [
        'id',
        'firstName',
        'lastName',
        ...(projection.email ? ['email'] : []),
      ] as (keyof Customer)[],
      where: { id: In(filter.customerIds) },
    });
  }

  public async createCustomer(request: Customer): Promise<Customer> {
    return this.save(request);
  }

  public async deleteCustomer(id: string): Promise<void> {
    await this.delete({ id });
    return;
  }
}

export default CustomersRepository;
