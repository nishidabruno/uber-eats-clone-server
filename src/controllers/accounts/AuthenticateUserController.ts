import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IAuthencaticateUserDTO } from '@dtos/IAuthencaticateUserDTO';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';

class AuthenticateUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as IAuthencaticateUserDTO;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ email, password });

    return res.status(200).json(token);
  }
}

export { AuthenticateUserController };
