import { container } from 'tsyringe';

import { CategoriesRepository } from '@infra/database/typeorm/repositories/CategoriesRepository';
import { OrdersRepository } from '@infra/database/typeorm/repositories/OrdersRepository';
import { ProductsRepository } from '@infra/database/typeorm/repositories/ProductsRepository';
import { StoresCoordinateRepository } from '@infra/database/typeorm/repositories/StoresCoodinateRepository';
import { StoresRepository } from '@infra/database/typeorm/repositories/StoresRepository';
import { UsersRepository } from '@infra/database/typeorm/repositories/UsersRepository';
import { ICategoriesRepository } from '@repositories/ICategoriesRepository';
import { IOrdersRepository } from '@repositories/IOrdersRepository';
import { IProductsRepository } from '@repositories/IProductsRepository';
import { IStoresCoordinatesRepository } from '@repositories/IStoresCoordinatesRepository';
import { IStoresRepository } from '@repositories/IStoresRepository';
import { IUsersRepository } from '@repositories/IUsersRepository';

import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IStoresCoordinatesRepository>(
  'StoresCoordinatesRepository',
  StoresCoordinateRepository
);
