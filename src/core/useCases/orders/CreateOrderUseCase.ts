import { inject, injectable } from 'tsyringe';

import { ICreateOrderDTO } from '@dtos/ICreateOrderDTO';
import { IOrder } from '@entities/IOrder';
import { AppError } from '@errors/AppError';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository
  ) {}

  async execute({
    orderProducts,
    user_id,
    store_id,
  }: ICreateOrderDTO): Promise<IOrder> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Provided user is invalid.', 400);
    }

    const store = await this.storesRepository.findById(store_id);
    if (!store) {
      throw new AppError('Provided store is invalid.', 400);
    }

    const order = await this.ordersRepository.create({
      orderProducts,
      user_id,
      store_id,
    });

    return order;
  }
}

export { CreateOrderUseCase };
