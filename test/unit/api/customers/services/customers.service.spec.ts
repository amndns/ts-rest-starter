import Customer from '../../../../../src/api/customers/models/customer.model';
import {
  CustomerResult,
  CustomersCreateRequest,
  CustomersGetFilter,
  CustomersGetProjection,
} from '../../../../../src/api/customers/models/customers.backend-model';
import CustomersService from '../../../../../src/api/customers/services/customers.service';
import CustomersRepositoryMock from '../repositories/customers.repository.mock';

describe('CustomersService', () => {
  const repo = new CustomersRepositoryMock();
  const customerService = new CustomersService(repo as any);

  describe('getCustomers', () => {
    it('Should retrieve a list of customers', async (done) => {
      const customerResult = new CustomerResult();
      customerResult.id = '1';
      customerResult.firstName = 'John';
      customerResult.lastName = 'Doe';
      customerResult.email = 'john.doe@test.com';

      repo.list = [customerResult];

      const filter = new CustomersGetFilter();
      filter.customerIds = ['1'];

      const projection = new CustomersGetProjection();
      projection.email = true;

      const list = await customerService.getCustomers(filter, projection);

      expect(repo.getCustomersMock).toBeCalledWith(filter, projection);
      expect(list).toStrictEqual([customerResult]);
      done();
    });
  });

  describe('createCustomer', () => {
    it('Should create a new customer', async (done) => {
      const request = new CustomersCreateRequest();
      request.firstName = 'John';
      request.lastName = 'Doe';
      request.email = 'john.doe@test.com';
      request.password = 'password123';

      const customerResult = new CustomerResult();
      customerResult.id = '1';
      customerResult.firstName = 'John';
      customerResult.lastName = 'Doe';
      customerResult.email = 'john.doe@test.com';
      customerResult.password = 'password123';
      repo.one = customerResult;

      const one = await customerService.createCustomer(request as Customer);

      expect(repo.createCustomerMock).toBeCalledWith(request);
      expect(one).toStrictEqual(customerResult);
      done();
    });
  });

  describe('deleteCustomer', () => {
    it('Should delete an existing customer', async (done) => {
      const customerId = '1';
      const one = await customerService.deleteCustomer(customerId);

      expect(repo.deleteCustomerMock).toBeCalledWith(customerId);
      expect(one).toBeUndefined();
      done();
    });
  });
});
