import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Customer from '../models/customer.model';
import {
  CustomersGetFilter,
  CustomersGetProjection,
} from '../models/customers.backend-model';
import CustomersRepository from '../repositories/customers.repository';

@Service()
class CustomersService {
  constructor(
    @InjectRepository() private customersRepository: CustomersRepository
  ) {}

  public async getCustomers(
    filter: CustomersGetFilter,
    projection: CustomersGetProjection
  ): Promise<Customer[]> {
    return this.customersRepository.getCustomers(filter, projection);
  }

  public async createCustomer(request: Customer): Promise<Customer> {
    return this.customersRepository.createCustomer(request);
  }

  public async deleteCustomer(id: string): Promise<void> {
    await this.customersRepository.deleteCustomer(id);
    return;
  }
}

export default CustomersService;
