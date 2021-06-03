import { ClassConstructor, plainToClass } from 'class-transformer';

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface BaseResponse {
  status: ResponseStatus;
}

export interface SuccessResponse<T> extends BaseResponse {
  result: T;
}

export interface ErrorResponse extends BaseResponse {
  error_code: string;
  message: string;
}

export type SuccessResponsePromise<T> = Promise<SuccessResponse<T>>;

/**
 * Wrapper for the endpoint controller response promises to resolve to a
 * `SuccessResponse`-shaped response object.
 */
export async function controllerResponse<X, Y>(
  cls: ClassConstructor<unknown>,
  promise: Promise<X>
): SuccessResponsePromise<Y> {
  return promise.then((result: X) => ({
    status: ResponseStatus.SUCCESS,
    result: plainToClass(cls, result) as Y,
  }));
}
