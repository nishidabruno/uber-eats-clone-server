import { ICreateOrderDTO } from '@dtos/ICreateOrderDTO';
import { IUpdateOrderStatusDTO } from '@dtos/IUpdateOrderStatusDTO';
import { IOrder } from '@entities/IOrder';
import { IOrderProduct } from '@entities/IOrderProduct';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { generateID } from '@utils/generateID';

class OrdersRepositoryInMemory implements IOrdersRepository {
  orders: IOrder[] = [];

  async create({
    orderProducts,
    store_id,
    user_id,
  }: ICreateOrderDTO): Promise<IOrder> {
    const order = {
      id: generateID(),
      orderProducts: orderProducts as IOrderProduct[],
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

  async findByStore(store_id: string, type?: string): Promise<IOrder[]> {
    switch (type) {
      case 'open':
        return this.orders.filter(
          (order) => order.store_id === store_id && order.is_completed === false
        );
      case 'closed':
        return this.orders.filter(
          (order) => order.store_id === store_id && order.is_completed === true
        );
      default:
        return this.orders.filter((order) => order.store_id === store_id);
    }
  }
}

export { OrdersRepositoryInMemory };
