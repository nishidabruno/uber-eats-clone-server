import { Router } from 'express';

import { AuthenticateUserController } from '@controllers/accounts/AuthenticateUserController';
import { CreateUserController } from '@controllers/accounts/CreateUserController';
import { GetUserInfoController } from '@controllers/accounts/GetUserInfoController';
import { EnsureAuthenticatedMiddleware } from '@middlewares/EnsureAuthenticatedMiddleware';

const usersRoutes = Router();

usersRoutes.get(
  '/me',
  EnsureAuthenticatedMiddleware.handle,
  GetUserInfoController.handle
);
usersRoutes.post('/', CreateUserController.handle);
usersRoutes.post('/authenticate', AuthenticateUserController.handle);

export { usersRoutes };
