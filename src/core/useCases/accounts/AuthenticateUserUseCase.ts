import { inject, injectable } from 'tsyringe';

import { auth } from '@config/auth';
import { IAuthencaticateUserDTO } from '@dtos/IAuthencaticateUserDTO';
import { AppError } from '@errors/AppError';
import { IHashProvider } from '@providers/IHashProvider';
import { ITokenProvider } from '@providers/ITokenProvider';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}
  async execute({
    email,
    password,
  }: IAuthencaticateUserDTO): Promise<Record<'token', string>> {
    const { expires_in_token, secret_token } = auth;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User or password is invalid.', 403);
    }

    const passwordMatches = await this.hashProvider.compare(
      password,
      user.password
    );
    if (!passwordMatches) {
      throw new AppError('User or password is invalid.', 403);
    }

    const token = this.tokenProvider.sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return { token };
  }
}

export { AuthenticateUserUseCase };
