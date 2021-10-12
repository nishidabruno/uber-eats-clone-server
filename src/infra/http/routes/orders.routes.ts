import { Router } from 'express';

import { CreateOrderController } from '@controllers/orders/CreateOrderController';
import { ListOrdersByStoreController } from '@controllers/orders/ListOrdersByStoreController';
import { ListOrdersByUserController } from '@controllers/orders/ListOrdersByUserController';
import { UpdateOrderStatusController } from '@controllers/orders/UpdateOrderStatusController';
import { EnsureAuthenticatedMiddleware } from '@middlewares/EnsureAuthenticatedMiddleware';

const ordersRoutes = Router();

ordersRoutes.post(
  '/',
  EnsureAuthenticatedMiddleware.handle,
  CreateOrderController.handle
);
ordersRoutes.get(
  '/list:filter?',
  EnsureAuthenticatedMiddleware.handle,
  ListOrdersByUserController.handle
);
ordersRoutes.get(
  '/store/list:type?',
  EnsureAuthenticatedMiddleware.handle,
  ListOrdersByStoreController.handle
);
ordersRoutes.patch(
  '/status/:order_id',
  EnsureAuthenticatedMiddleware.handle,
  UpdateOrderStatusController.handle
);

export { ordersRoutes };
