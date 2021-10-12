import { ICreateProductDTO } from '@dtos/ICreateProductDTO';
import { IProduct } from '@entities/IProduct';

interface IProductsRepository {
  create(productData: Omit<ICreateProductDTO, 'user_id'>): Promise<IProduct>;
  findByIds(productsIds: string[]): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | undefined>;
}

export { IProductsRepository };
