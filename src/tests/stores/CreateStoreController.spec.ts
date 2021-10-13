import path from 'path';
import request from 'supertest';
import { Connection } from 'typeorm';

import { createTypeormConnection } from '@config/typeorm';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { TokenProvider } from '@infra/container/providers/TokenProvider';
import { CategoriesRepository } from '@infra/database/typeorm/repositories/CategoriesRepository';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { app } from '@infra/http/app';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';

let connection: Connection;

let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let hashProvider: HashProvider;
let tokenProvider: TokenProvider;

describe('CreateStoreController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
    categoriesRepository = new CategoriesRepository();
    hashProvider = new HashProvider();
    usersRepository = new UsersRepository();
    tokenProvider = new TokenProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      hashProvider,
      tokenProvider
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new store', async () => {
    const passwordHash = await hashProvider.hash('valid-password', 8);
    await usersRepository.create({
      full_name: 'Valid name',
      email: 'valid@email.com',
      password: passwordHash,
    });

    const category = await categoriesRepository.create({
      image: 'Valid image',
      name: 'Valid category name',
    });

    const { token } = await authenticateUserUseCase.execute({
      email: 'valid@email.com',
      password: 'valid-password',
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
    const jsonCoordinates = JSON.stringify({
      longitude: 35.6847875,
      latitude: 139.710875,
    });
    const jsonCategories = JSON.stringify([category.id]);

    const response = await request(app)
      .post('/stores')
      .set({ Authorization: `Bearer ${token}` })
      .attach('image', imagePath)
      .field('address', 'Valid address')
      .field('coordinates', jsonCoordinates)
      .field('delivery_fee', 10)
      .field('delivery_time', 30)
      .field('name', 'Store name')
      .field('opening_time_weekend', '8-5')
      .field('opening_time_workweek', '8-5')
      .field('categories_id', jsonCategories);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('categories');
    expect(response.body.categories[0]).toHaveProperty('id');
    expect(response.body).toHaveProperty('coordinates_id');
  });
});
