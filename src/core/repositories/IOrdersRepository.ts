import { ICreateOrderDTO } from '@dtos/ICreateOrderDTO';
import { IUpdateOrderStatusDTO } from '@dtos/IUpdateOrderStatusDTO';
import { IOrder } from '@entities/IOrder';

interface IOrdersRepository {
  create(orderData: ICreateOrderDTO): Promise<IOrder>;
  findByUser(user_id: string, filter?: string): Promise<IOrder[]>;
  findById(order_id: string): Promise<IOrder | undefined>;
  findByStore(store_id: string, type?: string): Promise<IOrder[]>;
  updateOrderStatus({
    is_completed,
    order_id,
    user_id,
  }: IUpdateOrderStatusDTO): Promise<void>;
}

export { IOrdersRepository };
