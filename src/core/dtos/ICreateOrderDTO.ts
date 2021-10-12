import { IOrderProduct } from '@entities/IOrderProduct';

interface ICreateOrderDTO {
  user_id: string;
  store_id: string;
  orderProducts: IOrderProduct[];
}

export { ICreateOrderDTO };
