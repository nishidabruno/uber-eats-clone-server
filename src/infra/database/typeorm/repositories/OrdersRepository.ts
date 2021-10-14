import { getRepository, Repository } from 'typeorm';

import { ICreateOrderDTO } from '@dtos/ICreateOrderDTO';
import { IUpdateOrderStatusDTO } from '@dtos/IUpdateOrderStatusDTO';
import { IOrder } from '@entities/IOrder';
import { IOrdersRepository } from '@repositories/IOrdersRepository';

import { Order } from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    orderProducts,
    user_id,
    store_id,
  }: ICreateOrderDTO): Promise<IOrder> {
    const createOrderResult = this.repository.create({
      user_id,
      store_id,
      orderProducts,
    });
    const order = await this.repository.save(createOrderResult);

    return order;
  }

  async findByUser(user_id: string, filter: string): Promise<IOrder[]> {
    switch (filter) {
      case 'open':
        return this.repository.find({
          where: { is_completed: false, user_id },
          order: { is_completed: 'ASC' },
        });
      case 'closed':
        return this.repository.find({
          where: { is_completed: true, user_id },
          order: { is_completed: 'ASC' },
        });
      default:
        return this.repository.find({
          where: { user_id },
          order: { is_completed: 'ASC' },
        });
    }
  }

  async findById(order_id: string): Promise<IOrder | undefined> {
    return this.repository.findOne(order_id);
  }

  async updateOrderStatus({
    is_completed,
    order_id,
  }: IUpdateOrderStatusDTO): Promise<void> {
    console.log(is_completed);

    await this.repository.update({ id: order_id }, { is_completed });
  }

  async findByStore(store_id: string, type?: string): Promise<IOrder[]> {
    switch (type) {
      case 'open':
        return this.repository.find({
          where: { is_completed: false, store_id },
          order: { is_completed: 'ASC' },
        });
      case 'closed':
        return this.repository.find({
          where: { is_completed: true, store_id },
          order: { is_completed: 'ASC' },
        });
      default:
        return this.repository.find({
          where: { store_id },
          order: { is_completed: 'ASC' },
        });
    }
  }
}

export { OrdersRepository };
