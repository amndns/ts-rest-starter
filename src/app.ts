import 'reflect-metadata';

import expressLoader from './loaders/express.loader';
import iocLoader from './loaders/ioc.loader';
import typeormLoader from './loaders/typeorm.loader';
import winstonLoader from './loaders/winston.loader';

const appLoader = async () => {
  winstonLoader();
  iocLoader();
  await typeormLoader();
  expressLoader();
};

appLoader();
