import path from 'path';
import request from 'supertest';
import { Connection } from 'typeorm';

import upload from '@config/multer';
import { createTypeormConnection } from '@config/typeorm';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { TokenProvider } from '@infra/container/providers/TokenProvider';
import { StoresCoordinateRepository } from '@infra/database/typeorm/repositories/StoresCoodinateRepository';
import { StoresRepository } from '@infra/database/typeorm/repositories/StoresRepository';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { app } from '@infra/http/app';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';

let connection: Connection;

let usersRepository: UsersRepository;
let storesRepository: StoresRepository;
let storesCoordinatesRepository: StoresCoordinateRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let hashProvider: HashProvider;
let tokenProvider: TokenProvider;

describe('CreateProductController', () => {
  beforeAll(async () => {
    connection = await createTypeormConnection();
    await connection.runMigrations();

    usersRepository = new UsersRepository();
    storesRepository = new StoresRepository();
    storesCoordinatesRepository = new StoresCoordinateRepository();
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
    });

    const user = await usersRepository.findByEmail('valid@email.com');

    const storeCoordinates = await storesCoordinatesRepository.create({
      longitude: 123,
      latitude: 456,
    });

    const store = await storesRepository.create({
      address: 'Valid address',
      coordinates_id: storeCoordinates.id,
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
      image: 'valid image',
    });

    const { token } = await authenticateUserUseCase.execute({
      email: 'valid@email.com',
      password: 'valid-password',
    });

    const imagePath = path.resolve(upload.tmpFolder, 'test_image.jpg');

    const response = await request(app)
      .post('/products')
      .set({ Authorization: `Bearer ${token}` })
      .attach('image', imagePath)
      .field('name', 'Valid name')
      .field('description', 'Valid description')
      .field('store_id', store.id)
      .field('price', 100);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.store_id).toEqual(store.id);
  });
});
