import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@dtos/ICreateProductDTO';
import { IProduct } from '@entities/IProduct';
import { IProductsRepository } from '@repositories/IProductsRepository';

import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  create({
    description,
    image,
    name,
    price,
    store_id,
  }: Omit<ICreateProductDTO, 'user_id'>): Promise<IProduct> {
    const createProductResult = this.repository.create({
      description,
      image,
      name,
      price,
      store_id,
    });

    const product = this.repository.save(createProductResult);

    return product;
  }

  async findByIds(productsIds: string[]): Promise<IProduct[]> {
    return this.repository.findByIds(productsIds);
  }

  async findById(id: string): Promise<IProduct | undefined> {
    return this.repository.findOne(id);
  }
}

export { ProductsRepository };
