import { ICreateStoreCoordinatesDTO } from '@dtos/ICreateStoreCoordinatesDTO';
import { IStoreCoordinates } from '@entities/IStoreCoordinates';

interface IStoresCoordinatesRepository {
  create({
    longitude,
    latitude,
  }: ICreateStoreCoordinatesDTO): Promise<IStoreCoordinates>;
}

export { IStoresCoordinatesRepository };
