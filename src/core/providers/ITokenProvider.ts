interface ISignOptions {
  expiresIn?: string | number;
  subject?: string;
}

interface ITokenPayload {
  sub: string;
}

interface ITokenProvider {
  sign(
    payload: string | Record<string, unknown>,
    secret: string,
    options: ISignOptions
  ): string;
  verify(token: string, secret: string): ITokenPayload;
}

export { ITokenProvider, ISignOptions, ITokenPayload };
