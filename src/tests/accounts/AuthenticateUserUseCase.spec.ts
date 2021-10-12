import { AppError } from '@errors/AppError';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { TokenProvider } from '@infra/container/providers/TokenProvider';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;
let tokenProvider: TokenProvider;

describe('AuthenticateUserUseCase', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();
    tokenProvider = new TokenProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      tokenProvider
    );

    // SETUP
    const hashPassword = await hashProvider.hash('123', 8);
    await usersRepositoryInMemory.create({
      avatar: 'Valid avatar',
      email: 'valid@email.com',
      full_name: 'Valid name',
      password: hashPassword,
    });
  });

  it('should be able to authenticate an user', async () => {
    const token = await authenticateUserUseCase.execute({
      email: 'valid@email.com',
      password: '123',
    });

    expect(token).toHaveProperty('token');
  });

  it('should not be able to authenticate an user if user does not exist', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid@email.com',
        password: '123',
      })
    ).rejects.toEqual(new AppError('User or password is invalid.', 403));
  });

  it('should not be able to authenticate an user if password is invalid', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'valid@email.com',
        password: 'invalidPassword',
      })
    ).rejects.toEqual(new AppError('User or password is invalid.', 403));
  });
});
