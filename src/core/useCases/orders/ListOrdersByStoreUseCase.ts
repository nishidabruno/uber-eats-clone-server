import { inject, injectable } from 'tsyringe';

import { IOrder } from '@entities/IOrder';
import { AppError } from '@errors/AppError';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class ListOrdersByStoreUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}
  async execute(user_id: string, type?: string): Promise<IOrder[]> {
    const store = await this.storesRepository.findByUserId(user_id);

    if (!store) {
      throw new AppError('User does not have a store.', 400);
    }
    const orders = await this.ordersRepository.findByStore(store.id, type);

    return orders;
  }
}

export { ListOrdersByStoreUseCase };
