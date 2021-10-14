import { AppError } from '@errors/AppError';
import { OrdersRepositoryInMemory } from '@repositories/in-memory/OrdersRepositoryInMemory';
import { ProductsRepositoryInMemory } from '@repositories/in-memory/ProductsRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { CreateOrderUseCase } from '@useCases/orders/CreateOrderUseCase';

let createOrderUseCase: CreateOrderUseCase;
let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let storesRepositoryInMemory: StoresRepositoryInMemory;

describe('CreateOrderUseCase', () => {
  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    storesRepositoryInMemory = new StoresRepositoryInMemory();

    createOrderUseCase = new CreateOrderUseCase(
      ordersRepositoryInMemory,
      usersRepositoryInMemory,
      storesRepositoryInMemory
    );
  });

  it('should be able to create an order', async () => {
    await usersRepositoryInMemory.create({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const store = await storesRepositoryInMemory.create({
      address: 'Valid address',
      coordinates_id: '123',
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: user!.id,
      image: 'validImage',
    });

    const product = await productsRepositoryInMemory.create({
      description: 'Valid description',
      image: 'Valid image',
      name: 'Valid name',
      price: 100,
      store_id: store.id,
      user_id: user!.id,
    });

    const order = await createOrderUseCase.execute({
      orderProducts: [{ product_id: product.id, quantity: 1 }],
      store_id: store.id,
      user_id: user!.id,
    });

    expect(order).toHaveProperty('orderProducts');
    expect(order.orderProducts).toHaveLength(1);
    expect(order.orderProducts[0]).toHaveProperty('product_id');
    expect(order.orderProducts[0]).toHaveProperty('quantity');
  });

  it('should not be able to create an order if the provided user is invalid', async () => {
    const store = await storesRepositoryInMemory.create({
      address: 'Valid address',
      coordinates_id: '123',
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: 'invalidUserId',
      image: 'validImage',
    });

    const product = await productsRepositoryInMemory.create({
      description: 'Valid description',
      image: 'Valid image',
      name: 'Valid name',
      price: 100,
      store_id: store.id,
      user_id: 'invalidUserId',
    });

    await expect(
      createOrderUseCase.execute({
        orderProducts: [{ product_id: product.id, quantity: 1 }],
        store_id: store.id,
        user_id: 'invalidUserId',
      })
    ).rejects.toEqual(new AppError('Provided user is invalid.', 400));
  });

  it('should not be able to create an order if the provided store is invalid', async () => {
    await usersRepositoryInMemory.create({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: 'valid-password',
    });

    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const product = await productsRepositoryInMemory.create({
      description: 'Valid description',
      image: 'Valid image',
      name: 'Valid name',
      price: 100,
      store_id: 'invalidStoreId',
      user_id: user!.id,
    });

    await expect(
      createOrderUseCase.execute({
        orderProducts: [{ product_id: product.id, quantity: 1 }],
        store_id: 'invalidStoreId',
        user_id: user!.id,
      })
    ).rejects.toEqual(new AppError('Provided store is invalid.', 400));
  });
});
