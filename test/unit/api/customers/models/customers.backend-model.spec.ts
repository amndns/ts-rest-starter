import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  CustomerResult,
  CustomersCreateRequest,
  CustomersGetRequest,
  USERS_GET_REQUEST_VALIDATION,
  USERS_CREATE_REQUEST_VALIDATION,
} from '../../../../../src/api/customers/models/customers.backend-model';

describe('CustomerResult', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const customerResult = new CustomerResult();
    customerResult.email = 'abc123';

    const actualErrors = await validate(
      customerResult
    ).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      { isNotEmpty: 'id should not be empty' },
      { isNotEmpty: 'firstName should not be empty' },
      { isNotEmpty: 'lastName should not be empty' },
      { isEmail: 'email must be an email' },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const customerResult = new CustomerResult();
    customerResult.id = '1';
    customerResult.firstName = 'John';
    customerResult.lastName = 'Doe';
    customerResult.email = 'john.doe@test.com';

    const errors = await validate(customerResult);

    expect(errors).toStrictEqual([]);
    done();
  });
});

describe('CustomersGetRequest', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const params = new CustomersGetRequest();

    const actualErrors = await validate(params).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      { arrayNotEmpty: USERS_GET_REQUEST_VALIDATION.NOT_EMPTY.message },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const params = new CustomersGetRequest();
    params.customerIds = ['1'];

    const errors = await validate(params);

    expect(errors).toStrictEqual([]);
    done();
  });

  it('Should transform the fields according to the transformer rules', async (done) => {
    const rawParams = {
      email: 'false',
      customer_id: '1',
    };

    const params = plainToClass(CustomersGetRequest, rawParams);

    expect(params.email).toBeFalsy();
    expect(params.customerIds).toStrictEqual(['1']);
    done();
  });
});

describe('CustomersCreateRequest', () => {
  it('Should fail the validation when fields are invalid', async (done) => {
    const request = new CustomersCreateRequest();

    const actualErrors = await validate(request).then((validationErrors) =>
      validationErrors.map((validationError) => validationError.constraints)
    );

    const expectedErrors = [
      {
        isNotEmpty: USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY.message,
      },
      {
        isNotEmpty: USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY.message,
      },
      {
        isNotEmpty: USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY.message,
        isEmail: 'email must be an email',
      },
      {
        isNotEmpty: USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY.message,
      },
    ];

    expect(actualErrors).toStrictEqual(expectedErrors);
    done();
  });

  it('Should succeed the validation when fields are valid', async (done) => {
    const request = new CustomersCreateRequest();
    request.firstName = 'John';
    request.lastName = 'Doe';
    request.email = 'john.doe@test.com';
    request.password = 'password';

    const errors = await validate(request);

    expect(errors).toStrictEqual([]);
    done();
  });
});
