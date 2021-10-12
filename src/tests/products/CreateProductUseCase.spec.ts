import { AppError } from '@errors/AppError';
import { ProductsRepositoryInMemory } from '@repositories/in-memory/ProductsRepositoryInMemory';
import { StoresRepositoryInMemory } from '@repositories/in-memory/StoresRepositoryInMemory';
import { CreateProductUseCase } from '@useCases/products/CreateProductUseCase';

let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let storesRepositoryInMemory: StoresRepositoryInMemory;

describe('CreateProductUseCase', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    storesRepositoryInMemory = new StoresRepositoryInMemory();

    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory,
      storesRepositoryInMemory
    );
  });

  it('should be able to create a new product for a store', async () => {
    const store = await storesRepositoryInMemory.create({
      address: 'Valid address',
      location: {
        type: 'Point',
        coordinates: [123, 456],
      },
      delivery_fee: 0,
      delivery_time: 90,
      categories: [],
      name: 'Valid store name',
      opening_time_weekend: '8-17',
      opening_time_workweek: '8-18',
      user_id: '123',
    });

    const product = await createProductUseCase.execute({
      name: 'Valid name',
      description: 'Valid description',
      store_id: store.id,
      image: 'Valid image',
      price: 100,
      user_id: '123',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a product if the provided store_id does not exist', async () => {
    await expect(
      createProductUseCase.execute({
        name: 'Valid name',
        description: 'Valid description',
        store_id: '000',
        image: 'Valid image',
        price: 100,
        user_id: '123',
      })
    ).rejects.toEqual(new AppError('Store does not exist.', 400));
  });
});
