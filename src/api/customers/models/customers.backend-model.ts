import { isDefined, toArray, toBool } from '@amndns/service-utils/ts';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export const USERS_GET_REQUEST_VALIDATION = {
  NOT_EMPTY: {
    message: 'Must have field customer_id.',
  },
};
export const USERS_CREATE_REQUEST_VALIDATION = {
  NOT_EMPTY: {
    message: 'Must have fields: first_name, last_name, email, and password.',
  },
};

export class CustomerResult {
  @Exclude()
  public pk: number;

  @IsNotEmpty()
  public id: string;

  @Expose({ name: 'first_name', toPlainOnly: true })
  @IsNotEmpty()
  public firstName: string;

  @Expose({ name: 'last_name', toPlainOnly: true })
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @Exclude()
  public password: string;
}

/**
 * Combination of CustomersGetFilter and CustomersGetProjection.
 */
export class CustomersGetRequest {
  @Transform(({ value }) => (typeof value === 'string' ? toBool(value) : value))
  public email: boolean;

  @Expose({ name: 'customer_id' })
  @ArrayNotEmpty(USERS_GET_REQUEST_VALIDATION.NOT_EMPTY)
  @Transform(({ value }) => (isDefined(value) ? toArray(value) : undefined))
  public customerIds: string[];
}

export class CustomersGetFilter {
  public customerIds: string[];
}

export class CustomersGetProjection {
  public email: boolean;
}

export class CustomersCreateRequest {
  @Expose({ name: 'first_name' })
  @IsNotEmpty(USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY)
  public firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty(USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY)
  public lastName: string;

  @IsEmail()
  @IsNotEmpty(USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY)
  public email: string;

  @IsNotEmpty(USERS_CREATE_REQUEST_VALIDATION.NOT_EMPTY)
  public password: string;
}
