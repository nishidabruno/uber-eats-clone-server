import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/IHashProvider';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({ email, full_name, password }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('E-mail already registered.', 409);
    }

    const hashPassword = await this.hashProvider.hash(password, 8);

    await this.usersRepository.create({
      email,
      full_name,
      password: hashPassword,
    });
  }
}

export { CreateUserUseCase };
