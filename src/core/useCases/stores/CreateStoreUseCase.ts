import { inject, injectable } from 'tsyringe';

import { ICreateStoreDTO } from '@dtos/ICreateStoreDTO';
import { IStore } from '@entities/IStore';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@providers/IStorageProvider';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';
import { IStoresCoordinatesRepository } from '@repositories/IStoresCoordinatesRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class CreateStoreUseCase {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('StoresCoordinatesRepository')
    private storesCoordinatesRepository: IStoresCoordinatesRepository
  ) {}
  async execute({
    address,
    coordinates,
    categories_id,
    delivery_fee,
    delivery_time,
    name,
    opening_time_weekend,
    opening_time_workweek,
    user_id,
    image,
  }: ICreateStoreDTO): Promise<IStore> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('The provided user does not exist.', 400);
    }

    if (!categories_id) {
      throw new AppError('Categories should be provided', 400);
    }

    const categories = await this.categoriesRepository.findByIds(categories_id);

    const storeCoordinates = await this.storesCoordinatesRepository.create({
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    });

    await this.storageProvider.save(image, 'stores');
    await this.storageProvider.delete(image, '');

    const store = await this.storesRepository.create({
      address,
      coordinates_id: storeCoordinates.id,
      delivery_fee,
      delivery_time,
      name,
      opening_time_weekend,
      opening_time_workweek,
      user_id,
      categories,
      image,
    });

    return store;
  }
}

export { CreateStoreUseCase };
