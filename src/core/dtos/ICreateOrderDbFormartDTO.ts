import { Product } from '@infra/database/typeorm/entities/Product';

import { ICreateOrderDTO } from './ICreateOrderDTO';

interface ICreateOrderDbFormatDTO extends Omit<ICreateOrderDTO, 'productIds'> {
  products: Product[];
}

export { ICreateOrderDbFormatDTO };
