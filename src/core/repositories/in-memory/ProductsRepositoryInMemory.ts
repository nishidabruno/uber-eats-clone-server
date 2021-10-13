import { ICreateProductDTO } from '@dtos/ICreateProductDTO';
import { IProduct } from '@entities/IProduct';
import { IProductsRepository } from '@repositories/IProductsRepository';
import { generateID } from '@utils/generateID';

class ProductsRepositoryInMemory implements IProductsRepository {
  products: IProduct[] = [];

  async create({
    description,
    image,
    name,
    price,
    store_id,
  }: ICreateProductDTO): Promise<IProduct> {
    const product = {
      description,
      id: generateID(),
      image,
      name,
      price,
      store_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.products.push(product);

    return product;
  }

  async findByIds(productsIds: string[]): Promise<IProduct[]> {
    const foundProducts: IProduct[] = [];

    productsIds.forEach((productId) => {
      const product = this.products.find((product) => product.id === productId);
      if (product) {
        foundProducts.push(product);
      }
    });

    return foundProducts;
  }

  async findById(id: string): Promise<IProduct | undefined> {
    return this.products.find((product) => product.id === id);
  }
}

export { ProductsRepositoryInMemory };
