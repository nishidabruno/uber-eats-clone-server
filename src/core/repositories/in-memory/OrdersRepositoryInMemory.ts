import { ICreateOrderDbFormatDTO } from '@dtos/ICreateOrderDbFormartDTO';
import { IUpdateOrderStatusDTO } from '@dtos/IUpdateOrderStatusDTO';
import { IOrder } from '@entities/IOrder';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { generateID } from '@utils/generateID';

class OrdersRepositoryInMemory implements IOrdersRepository {
  orders: IOrder[] = [];

  async create({
    products,
    store_id,
    user_id,
  }: ICreateOrderDbFormatDTO): Promise<IOrder> {
    const order: IOrder = {
      id: generateID(),
      products,
      user_id,
      is_completed: false,
      store_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.orders.push(order);

    return order;
  }

  async findByUser(filter?: string): Promise<IOrder[]> {
    switch (filter) {
      case 'open':
        return this.orders.filter((order) => order.is_completed === false);
      case 'closed':
        return this.orders.filter((order) => order.is_completed === true);
      default:
        return this.orders;
    }
  }

  async findById(order_id: string): Promise<IOrder | undefined> {
    return this.orders.find((order) => order.id === order_id);
  }

  async updateOrderStatus({
    is_completed,
    order_id,
  }: IUpdateOrderStatusDTO): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === order_id);

    this.orders[orderIndex].is_completed = is_completed;
  }
}

export { OrdersRepositoryInMemory };
