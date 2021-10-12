import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserInfoUseCase } from '@useCases/accounts/GetUserInfoUseCase';

class GetUserInfoController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const getUserInfoUseCase = container.resolve(GetUserInfoUseCase);

    const user = await getUserInfoUseCase.execute(id);

    return res.status(200).json(user);
  }
}

export { GetUserInfoController };
