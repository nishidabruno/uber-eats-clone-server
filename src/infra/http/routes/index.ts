import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { ordersRoutes } from './orders.routes';
import { productsRoutes } from './products.routes';
import { storesRoutes } from './stores.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/stores', storesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);

export { router };
