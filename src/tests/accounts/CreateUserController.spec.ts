import request from 'supertest';
import { Connection } from 'typeorm';

import { createTypeormConnection } from '@config/typeorm';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { app } from '@infra/http/app';

let connection: Connection;
let usersRepository: UsersRepository;

describe('CreateUserController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
    });

    const user = await usersRepository.findByEmail('validemail@email.com');

    expect(response.statusCode).toEqual(201);
    expect(user).toHaveProperty('id');
  });
});
