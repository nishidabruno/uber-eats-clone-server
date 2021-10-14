import { OrdersRepositoryInMemory } from '@repositories/in-memory/OrdersRepositoryInMemory';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { ListOrdersByUserUseCase } from '@useCases/orders/ListOrdersByUserUseCase';

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let listOrdersByUserUseCase: ListOrdersByUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe('ListOrdersByUserUseCase', () => {
  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    listOrdersByUserUseCase = new ListOrdersByUserUseCase(
      ordersRepositoryInMemory
    );
  });

  it('should be able to list all orders by user', async () => {
    usersRepository.create({
      email: 'valid@email.com',
      full_name: 'name',
      password: '123',
    });
    const user = await usersRepository.findByEmail('valid@email.com');

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      orderProducts: [],
    });

    const orders = await listOrdersByUserUseCase.execute(user!.id);

    expect(orders).toHaveLength(1);
    expect(orders[0]).toHaveProperty('store_id');
    expect(orders[0]).toHaveProperty('user_id');
    expect(orders[0]).toHaveProperty('orderProducts');
    expect(orders[0].is_completed).toEqual(false);
  });

  it('should be able to list only by open orders', async () => {
    const order = await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      orderProducts: [],
    });

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      orderProducts: [],
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
      orderProducts: [],
    });

    await ordersRepositoryInMemory.create({
      store_id: '123',
      user_id: '321',
      orderProducts: [],
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
