import { IOrderProduct } from './IOrderProduct';

interface IOrder {
  id: string;
  user_id: string;
  store_id: string;
  orderProducts: IOrderProduct[];
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export { IOrder };
