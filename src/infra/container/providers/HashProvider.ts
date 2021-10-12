import { hash, compare } from 'bcryptjs';

import { IHashProvider } from '@providers/IHashProvider';

class HashProvider implements IHashProvider {
  async hash(text: string, salts: number): Promise<string> {
    return hash(text, salts);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return compare(text, hash);
  }
}

export { HashProvider };
