import { inject, injectable } from 'tsyringe';

import { auth } from '@config/auth';
import { AppError } from '@errors/AppError';
import { ITokenProvider } from '@providers/ITokenProvider';
import { IUsersRepository } from '@repositories/IUsersRepository';

@injectable()
class EnsureAuthenticatedUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(authHeader: string): Promise<string> {
    const { secret_token } = auth;

    // "Bearer token"
    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = this.tokenProvider.verify(token, secret_token);

      const user = await this.usersRepository.findById(user_id);
      if (!user) {
        throw new AppError('Invalid token.', 401);
      }

      return user_id;
    } catch (err) {
      throw new AppError('Invalid token.', 401);
    }
  }
}

export { EnsureAuthenticatedUseCase };
