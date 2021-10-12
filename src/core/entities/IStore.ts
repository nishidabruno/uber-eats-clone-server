import { ICategory } from './ICategory';

interface IStore {
  id: string;
  name: string;
  user_id: string;
  address: string;
  coordinates_id: string;
  categories: ICategory[];
  delivery_time: number;
  delivery_fee: number;
  opening_time_workweek: string;
  opening_time_weekend: string;
  created_at: Date;
  updated_at: Date;
}

export { IStore };
