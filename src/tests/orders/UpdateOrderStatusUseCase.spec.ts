import { AppError } from '@errors/AppError';
import { OrdersRepositoryInMemory } from '@repositories/in-memory/OrdersRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { UpdateOrderStatusUseCase } from '@useCases/orders/UpdateOrderStatusUseCase';

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let updateOrderStatusUseCase: UpdateOrderStatusUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let storesRepository: StoresRepositoryInMemory;

describe('UpdateOrderStatusUseCase', () => {
  beforeEach(async () => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    storesRepository = new StoresRepositoryInMemory();

    updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
      ordersRepositoryInMemory,
      usersRepositoryInMemory,
      storesRepository
    );

    // SETUP
    await usersRepositoryInMemory.create({
      email: 'valid@email.com',
      full_name: 'Valid name',
      password: 'valid-password',
    });
  });

  it('should be able to update order status', async () => {
    const user = await usersRepositoryInMemory.findByEmail('valid@email.com');

    const newOrder = await ordersRepositoryInMemory.create({
      orderProducts: [],
      store_id: '123',
      user_id: user!.id,
    });

    await updateOrderStatusUseCase.execute({
      is_completed: true,
      order_id: newOrder.id,
      user_id: user!.id,
    });

    const updatedOrder = await ordersRepositoryInMemory.findById(newOrder.id);

    expect(updatedOrder!.is_completed).toEqual(true);
  });

  it('should not be able to update the order if the provided order id is invalid', async () => {
    const user = await usersRepositoryInMemory.findByEmail('valid@email.com');

    await expect(
      updateOrderStatusUseCase.execute({
        is_completed: true,
        order_id: 'invalidOrderId',
        user_id: user!.id,
      })
    ).rejects.toEqual(new AppError('The provided order id is invalid.', 400));
  });

  it('should not be able to update the order if the provided order id and user id is different', async () => {
    const newOrder = await ordersRepositoryInMemory.create({
      orderProducts: [],
      store_id: '123',
      user_id: '123',
    });

    await expect(
      updateOrderStatusUseCase.execute({
        is_completed: true,
        order_id: newOrder.id,
        user_id: '999',
      })
    ).rejects.toEqual(
      new AppError(
        'Only the user who made the order or the store can change order status.',
        401
      )
    );
  });
});
