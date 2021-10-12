import { inject, injectable } from 'tsyringe';

import { IOrder } from '@entities/IOrder';
import { IOrdersRepository } from '@repositories/IOrdersRepository';

@injectable()
class ListOrdersByUserUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(
    user_id: string,
    filter?: 'open' | 'closed'
  ): Promise<IOrder[]> {
    const orders = await this.ordersRepository.findByUser(user_id, filter);

    return orders;
  }
}

export { ListOrdersByUserUseCase };
