import { getRepository, Repository } from 'typeorm';

import { ICreateStoreCoordinatesDTO } from '@dtos/ICreateStoreCoordinatesDTO';
import { IStoreCoordinates } from '@entities/IStoreCoordinates';
import { IStoresCoordinatesRepository } from '@repositories/IStoresCoordinatesRepository';

import { StoreCoordinates } from '../entities/StoreCoordinates';

class StoresCoordinateRepository implements IStoresCoordinatesRepository {
  repository: Repository<StoreCoordinates>;

  constructor() {
    this.repository = getRepository(StoreCoordinates);
  }

  async create({
    longitude,
    latitude,
  }: ICreateStoreCoordinatesDTO): Promise<IStoreCoordinates> {
    const createCoordinateResult = this.repository.create({
      latitude,
      longitude,
    });

    const coordinate = await this.repository.save(createCoordinateResult);

    return coordinate;
  }
}

export { StoresCoordinateRepository };
