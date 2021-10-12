import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from '@useCases/categories/ListCategoriesUseCase';

class ListCategoriesController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
