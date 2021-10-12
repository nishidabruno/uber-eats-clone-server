import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/multer';
import { CreateCategoryController } from '@controllers/categories/CreateCategoryController';
import { ListCategoriesController } from '@controllers/categories/ListCategoriesUseController';
import { ListStoresByCategoryController } from '@controllers/categories/ListStoresByCategoryController';

const upload = multer(uploadConfig);

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  upload.single('image'),
  CreateCategoryController.handle
);
categoriesRoutes.get('/', ListCategoriesController.handle);
categoriesRoutes.get('/:id', ListStoresByCategoryController.handle);

export { categoriesRoutes };
