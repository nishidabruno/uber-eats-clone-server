import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { CreateUserUseCase } from '@useCases/accounts/CreateUserUseCase';

class CreateUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { full_name, email, password } = req.body as ICreateUserDTO;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      full_name,
      email,
      password,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
