import { ICreateStoreCoordinatesDTO } from '@dtos/ICreateStoreCoordinatesDTO';
import { IStoreCoordinates } from '@entities/IStoreCoordinates';
import { IStoresCoordinatesRepository } from '@repositories/IStoresCoordinatesRepository';
import { generateID } from '@utils/generateID';

class StoresCoordinatesRepositoryInMemory
  implements IStoresCoordinatesRepository
{
  coordinates: IStoreCoordinates[] = [];
  async create({
    longitude,
    latitude,
  }: ICreateStoreCoordinatesDTO): Promise<IStoreCoordinates> {
    const coordinates = {
      id: generateID(),
      longitude,
      latitude,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.coordinates.push(coordinates);

    return coordinates;
  }
}

export { StoresCoordinatesRepositoryInMemory };
