import path from 'path';
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

  const imagePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'products',
    'mc_fish.jpg'
  );

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .attach('image', imagePath)
      .field('name', 'Valid category')
      .field('name', 'Valid category');

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
  });
});
