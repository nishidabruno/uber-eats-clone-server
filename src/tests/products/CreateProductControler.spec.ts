import request from 'supertest';
import { Connection } from 'typeorm';

import { createTypeormConnection } from '@config/typeorm';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { TokenProvider } from '@infra/container/providers/TokenProvider';
import { StoresRepository } from '@infra/database/typeorm/repositories/StoresRepository';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { app } from '@infra/http/app';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';

let connection: Connection;

let usersRepository: UsersRepository;
let storesRepository: StoresRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let hashProvider: HashProvider;
let tokenProvider: TokenProvider;

describe('CreateProductController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
    storesRepository = new StoresRepository();
    hashProvider = new HashProvider();
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

  it('should be able to create a new product', async () => {
    const passwordHash = await hashProvider.hash('valid-password', 8);
    await usersRepository.create({
      full_name: 'Valid name',
      email: 'valid@email.com',
      password: passwordHash,
      avatar: 'http://valid-imgurl.com',
    });

    const user = await usersRepository.findByEmail('valid@email.com');

    const store = await storesRepository.create({
      address: 'Valid address',
      location: {
        type: 'Point',
        coordinates: [123, 456],
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
    });

    const { token } = await authenticateUserUseCase.execute({
      email: 'valid@email.com',
      password: 'valid-password',
    });

    const response = await request(app)
      .post('/products')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: 'Valid name',
        description: 'Valid description',
        store_id: store.id,
        image: 'Valid image',
        price: 100,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.store_id).toEqual(store.id);
  });
});
