import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { EnsureAuthenticatedUseCase } from '@useCases/accounts/EnsureAuthenticatedUseCase';

class EnsureAuthenticatedMiddleware {
  static async handle(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    const ensureAuthenticatedUseCase = container.resolve(
      EnsureAuthenticatedUseCase
    );

    if (!authHeader) {
      throw new AppError('No authorization header was provided.', 401);
    }
    const userId = await ensureAuthenticatedUseCase.execute(authHeader);

    req.user = {
      id: userId,
    };

    return next();
  }
}

export { EnsureAuthenticatedMiddleware };
