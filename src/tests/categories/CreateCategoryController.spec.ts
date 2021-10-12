import request from 'supertest';
import { Connection } from 'typeorm';

import { createTypeormConnection } from '@config/typeorm';
import { app } from '@infra/http/app';

let connection: Connection;

describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Valid category',
      image: 'Valid image link',
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });
});
