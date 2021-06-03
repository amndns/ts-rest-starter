import { Logger, WinstonLogger } from '@amndns/service-utils/logger';
import * as express from 'express';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Customer from '../../api/customers/models/customer.model';
import CustomersRepository from '../../api/customers/repositories/customers.repository';

@Service()
export class AuthService {
  constructor(
    @Logger(__filename) private log: WinstonLogger,
    @InjectRepository() private customersRepository: CustomersRepository
  ) {}

  public parseBasicAuthFromRequest(
    req: express.Request
  ): { username: string; password: string } {
    const authorization = req.header('authorization');

    if (authorization && authorization.split(' ')[0] === 'Basic') {
      this.log.info('Credentials provided by the client.');
      const decodedBase64 = Buffer.from(
        authorization.split(' ')[1],
        'base64'
      ).toString('ascii');
      const username = decodedBase64.split(':')[0];
      const password = decodedBase64.split(':')[1];
      if (username && password) {
        return { username, password };
      }
    }

    this.log.info('No credentials provided by the client.');
    return undefined;
  }

  public async validateCustomer(
    username: string,
    password: string
  ): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: {
        email: username,
      },
    });

    if (!!customer && (await Customer.comparePassword(customer, password))) {
      return customer;
    }

    return undefined;
  }
}
