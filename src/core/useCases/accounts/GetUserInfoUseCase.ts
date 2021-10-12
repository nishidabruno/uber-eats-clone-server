import { inject, injectable } from 'tsyringe';

import { IUser } from '@entities/IUser';
import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class GetUserInfoUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<Omit<IUser, 'password'>> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User id is invalid.', 400);
    }

    const { password, ...userFormatted } = user;

    return userFormatted;
  }
}

export { GetUserInfoUseCase };
