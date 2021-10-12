import { inject, injectable } from 'tsyringe';

import { ICreateStoreCoordinatesDTO } from '@dtos/ICreateStoreCoordinatesDTO';
import { IStoreCoordinates } from '@entities/IStoreCoordinates';
import { IStoresCoordinatesRepository } from '@repositories/IStoresCoordinatesRepository';

@injectable()
class CreateStoreCoordinatesUseCase {
  constructor(
    @inject('StoresCoordinatesRepository')
    private storesCoordiantesRepository: IStoresCoordinatesRepository
  ) {}

  async execute({
    latitude,
    longitude,
    store_id,
  }: ICreateStoreCoordinatesDTO): Promise<IStoreCoordinates> {
    const storeCoordinates = await this.storesCoordiantesRepository.create({
      longitude,
      latitude,
      store_id,
    });

    return storeCoordinates;
  }
}

export { CreateStoreCoordinatesUseCase };
