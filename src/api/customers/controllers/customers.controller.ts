import { plainToClass } from 'class-transformer';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Delete,
  QueryParams,
  OnUndefined,
} from 'routing-controllers';
import { Service } from 'typedi';
import { controllerResponse, SuccessResponsePromise } from '../../../utils';
import Customer from '../models/customer.model';
import {
  CustomersCreateRequest,
  CustomersGetRequest,
  CustomersGetFilter,
  CustomersGetProjection,
  CustomerResult,
} from '../models/customers.backend-model';
import CustomersService from '../services/customers.service';

@JsonController('/customers')
@Service()
class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  get(
    @QueryParams() params: CustomersGetRequest
  ): SuccessResponsePromise<CustomerResult[]> {
    const filter = new CustomersGetFilter();
    filter.customerIds = params.customerIds;

    const projection = new CustomersGetProjection();
    projection.email = !!params.email;

    return controllerResponse(
      CustomerResult,
      this.customersService.getCustomers(filter, projection)
    );
  }

  @Post()
  async post(
    @Body() request: CustomersCreateRequest
  ): SuccessResponsePromise<CustomerResult> {
    const transformedRequest = plainToClass(Customer, request);
    return controllerResponse(
      CustomerResult,
      this.customersService.createCustomer(transformedRequest)
    );
  }

  @Delete('/:id')
  @OnUndefined(204)
  public delete(@Param('id') id: string): SuccessResponsePromise<void> {
    return controllerResponse(
      CustomerResult,
      this.customersService.deleteCustomer(id)
    );
  }
}

export default CustomersController;
