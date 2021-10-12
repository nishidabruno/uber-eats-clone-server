import { OrdersRepositoryInMemory } from '@repositories/in-memory/OrdersRepositoryInMemory';
import { ListOrdersByUserUseCase } from '@useCases/orders/ListOrdersByUserUseCase';

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let listOrdersByUserUseCase: ListOrdersByUserUseCase;

describe('ListOrdersByUserUseCase', () => {
  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    listOrdersByUserUseCase = new ListOrdersByUserUseCase(
      ordersRepositoryInMemory
    );
  });

  it('should be able to list all orders by user', async () => {
    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    const orders = await listOrdersByUserUseCase.execute();

    expect(orders).toHaveLength(2);
    expect(orders[0]).toHaveProperty('store_id');
    expect(orders[0]).toHaveProperty('user_id');
    expect(orders[0]).toHaveProperty('products');
  });

  it('should be able to list only by open orders', async () => {
    const order = await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    ordersRepositoryInMemory.updateOrderStatus({
      is_completed: true,
      order_id: order.id,
      user_id: '321',
    });

    const orders = await listOrdersByUserUseCase.execute('open');

    expect(orders).toHaveLength(1);
    expect(orders[0].is_completed).toEqual(false);
  });

  it('should be able to list only by closed orders', async () => {
    const order = await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      products: [],
    });

    ordersRepositoryInMemory.updateOrderStatus({
      is_completed: true,
      order_id: order.id,
      user_id: '321',
    });

    const orders = await listOrdersByUserUseCase.execute('closed');

    expect(orders).toHaveLength(1);
    expect(orders[0].is_completed).toEqual(true);
  });
});
