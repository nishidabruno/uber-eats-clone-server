import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConnection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host:
        process.env.NODE_ENV === 'test'
          ? process.env.DB_TEST_HOST
          : process.env.DB_HOST,
      database:
        process.env.NODE_ENV === 'test'
          ? 'uber_eats_test'
          : defaultOptions.database,
    })
  );
};
