import { IStore } from './IStore';

interface ICategory {
  id: string;
  name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  stores?: IStore[];
}

export { ICategory };
