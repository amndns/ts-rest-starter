import Customer from '../../../../../src/api/customers/models/customer.model';
import {
  CustomerResult,
  CustomersGetFilter,
  CustomersGetProjection,
} from '../../../../../src/api/customers/models/customers.backend-model';

class CustomersRepositoryMock {
  public one: CustomerResult;
  public list: CustomerResult[];
  public findOneResult: CustomerResult;

  public getCustomersMock = jest.fn();
  public createCustomerMock = jest.fn();
  public deleteCustomerMock = jest.fn();
  public findOneMock = jest.fn();

  public async getCustomers(
    filter: CustomersGetFilter,
    projection: CustomersGetProjection
  ): Promise<CustomerResult[]> {
    this.getCustomersMock(filter, projection);
    return Promise.resolve(this.list);
  }

  public async createCustomer(request: Customer): Promise<CustomerResult> {
    this.createCustomerMock(request);
    return Promise.resolve(this.one);
  }

  public async deleteCustomer(id: string): Promise<void> {
    this.deleteCustomerMock(id);
    return Promise.resolve();
  }

  public async findOne(request: any): Promise<CustomerResult> {
    this.findOneMock(request);
    return Promise.resolve(this.findOneResult);
  }
}

export default CustomersRepositoryMock;
