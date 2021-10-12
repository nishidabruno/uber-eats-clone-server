import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/multer';
import { CreateProductController } from '@controllers/products/CreateProductController';
import { EnsureAuthenticatedMiddleware } from '@middlewares/EnsureAuthenticatedMiddleware';

const productsRoutes = Router();
const upload = multer(uploadConfig);

productsRoutes.post(
  '/',
  EnsureAuthenticatedMiddleware.handle,
  upload.single('image'),
  CreateProductController.handle
);

export { productsRoutes };
