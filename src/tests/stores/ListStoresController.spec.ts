import request from 'supertest';
import { Connection } from 'typeorm';

import { createTypeormConnection } from '@config/typeorm';
import { StoresRepository } from '@infra/database/typeorm/repositories/StoresRepository';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { app } from '@infra/http/app';

let connection: Connection;

let usersRepository: UsersRepository;
let storesRepository: StoresRepository;

describe('ListStoresController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
    storesRepository = new StoresRepository();
    usersRepository = new UsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all stores', async () => {
    await usersRepository.create({
      full_name: 'Valid name',
      email: 'valid@email.com',
      password: 'valid-password',
      avatar: 'http://valid-imgurl.com',
    });

    const user = await usersRepository.findByEmail('valid@email.com');

    await storesRepository.create({
      address: 'Valid address',
      location: {
        type: 'Point',
        coordinates: [41.40338, 2.17403],
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
    });

    const response = await request(app).get('/stores');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].location.coordinates).toEqual([41.40338, 2.17403]);
    expect(response.body[0]).toHaveProperty('categories');
    expect(response.body[0]).toHaveProperty('products');
  });
});
