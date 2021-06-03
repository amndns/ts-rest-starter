import 'reflect-metadata';

jest.mock('@amndns/redis-ts', () => ({
  RedisClient: () => () => {},
  RedisClusterClient: () => () => {},
}));

jest.mock('uuid', () => ({
  v4: () => '12345',
}));
