import { inject, injectable } from 'tsyringe';

import { ICreateProductDTO } from '@dtos/ICreateProductDTO';
import { IProduct } from '@entities/IProduct';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/IStorageProvider';
import { IProductsRepository } from '@repositories/IProductsRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    description,
    image,
    name,
    price,
    user_id,
  }: ICreateProductDTO): Promise<IProduct> {
    const store = await this.storesRepository.findByUserId(user_id);

    if (!store) {
      throw new AppError('Store does not exist.', 400);
    }

    await this.storageProvider.save(image, 'products');
    await this.storageProvider.delete(image, '');

    const product = await this.productsRepository.create({
      description,
      image,
      name,
      price,
      store_id: store.id,
    });

    return product;
  }
}

export { CreateProductUseCase };
