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
      avatar: 'http://valid-imgurl.com',
    });

    const category = await categoriesRepository.create({
      image: 'Valid image',
      name: 'Valid category name',
    });

    const user = await usersRepository.findByEmail('valid@email.com');

    const { token } = await authenticateUserUseCase.execute({
      email: 'valid@email.com',
      password: 'valid-password',
    });

    const response = await request(app)
      .post('/stores')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        address: 'Valid address',
        location: {
          long: 35.6847875,
          lat: 139.710875,
        },
        delivery_fee: 0,
        delivery_time: 90,
        categories_id: [category.id],
        name: 'Valid store name',
        opening_time_weekend: '8-17',
        opening_time_workweek: '8-18',
        user_id: user?.id,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('categories');
    expect(response.body.categories[0]).toHaveProperty('id');
    expect(response.body.location.coordinates).toHaveLength(2);
  });
});
