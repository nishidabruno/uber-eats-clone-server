import { inject, injectable } from 'tsyringe';

import { IUpdateOrderStatusDTO } from '@dtos/IUpdateOrderStatusDTO';
import { AppError } from '@errors/AppError';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class UpdateOrderStatusUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  async execute({
    is_completed,
    order_id,
    user_id,
  }: IUpdateOrderStatusDTO): Promise<void> {
    if (typeof is_completed !== 'boolean') {
      throw new AppError(
        'The provided status for order update does not exist.',
        400
      );
    }

    const order = await this.ordersRepository.findById(order_id);
    if (!order) {
      throw new AppError('The provided order id is invalid.', 400);
    }

    const store = await this.storesRepository.findById(order.store_id);
    if (user_id !== order.user_id && user_id !== store?.user_id) {
      throw new AppError(
        'Only the user who made the order or the store can change order status.',
        401
      );
    }

    await this.ordersRepository.updateOrderStatus({
      order_id,
      is_completed,
      user_id,
    });
  }
}

export { UpdateOrderStatusUseCase };
