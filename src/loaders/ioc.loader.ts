import { useContainer as classValidatorUseContainer } from 'class-validator';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { useContainer as ormUseContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

/**
 * Setup Routing-Controllers and TypeORM to use TypeDI container.
 */
const iocLoader = (): void => {
  routingUseContainer(Container);
  ormUseContainer(Container);
  classValidatorUseContainer(Container);
};

export default iocLoader;
