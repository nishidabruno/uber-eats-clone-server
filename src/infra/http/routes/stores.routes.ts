import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/multer';
import { CreateStoreController } from '@controllers/stores/CreateStoreController';
import { FindStoresByNameController } from '@controllers/stores/FindStoresByNameController';
import { GetStoreByIdController } from '@controllers/stores/GetStoreByIdController';
import { GetStoreByUserIdController } from '@controllers/stores/GetStoreByUserIdController';
import { ListStoresController } from '@controllers/stores/ListStoresController';
import { EnsureAuthenticatedMiddleware } from '@middlewares/EnsureAuthenticatedMiddleware';

const storesRoutes = Router();

const upload = multer(uploadConfig);

storesRoutes.post(
  '/',
  EnsureAuthenticatedMiddleware.handle,
  upload.single('image'),
  CreateStoreController.handle
);
storesRoutes.get('/search/:name?', FindStoresByNameController.handle);
storesRoutes.get('/user/:id?', GetStoreByUserIdController.handle);
storesRoutes.get('/:id', GetStoreByIdController.handle);
storesRoutes.get('/', ListStoresController.handle);

export { storesRoutes };
