import { sign, verify } from 'jsonwebtoken';

import {
  ITokenPayload,
  ISignOptions,
  ITokenProvider,
} from '@providers/ITokenProvider';

class TokenProvider implements ITokenProvider {
  sign(payload: string, secret: string, options: ISignOptions): string {
    return sign(payload, secret, options);
  }

  verify(token: string, secret: string): ITokenPayload {
    const { sub } = verify(token, secret);

    const subString = String(sub);

    return { sub: subString };
  }
}

export { TokenProvider };
