import { AppError } from '@errors/AppError';
import { HashProvider } from '@infra/container/providers/HashProvider';
import { TokenProvider } from '@infra/container/providers/TokenProvider';
import { UsersRepositoryInMemory } from '@repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from '@useCases/accounts/AuthenticateUserUseCase';
import { EnsureAuthenticatedUseCase } from '@useCases/accounts/EnsureAuthenticatedUseCase';

let ensureAuthenticatedUseCase: EnsureAuthenticatedUseCase;
let tokenProvider: TokenProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let authenticateUserUseCase: AuthenticateUserUseCase;
let hashProvider: HashProvider;

describe('EnsureAuthenticatedUseCase', () => {
  beforeEach(async () => {
    tokenProvider = new TokenProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      tokenProvider
    );
    ensureAuthenticatedUseCase = new EnsureAuthenticatedUseCase(
      tokenProvider,
      usersRepositoryInMemory
    );

    // SETUP
    const hashPassword = await hashProvider.hash('valid-password', 8);
    await usersRepositoryInMemory.create({
      full_name: 'Valid name',
      email: 'validemail@email.com',
      password: hashPassword,
    });
  });

  it('should able to ensure the user is authenticated', async () => {
    const user = await usersRepositoryInMemory.findByEmail(
      'validemail@email.com'
    );

    const { token } = await authenticateUserUseCase.execute({
      email: 'validemail@email.com',
      password: 'valid-password',
    });

    const user_id = await ensureAuthenticatedUseCase.execute(`Bearer ${token}`);

    expect(user_id).toEqual(user!.id);
  });

  it('should not be able to ensure authentication if the provided token is invalid', async () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    await expect(
      ensureAuthenticatedUseCase.execute(`Bearer ${invalidToken}`)
    ).rejects.toEqual(new AppError('Invalid token.', 401));
  });
});
