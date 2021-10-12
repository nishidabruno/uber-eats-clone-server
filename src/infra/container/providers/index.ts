import { container } from 'tsyringe';

import { IHashProvider } from '@providers/IHashProvider';
import { IStorageProvider } from '@providers/IStorageProvider';
import { ITokenProvider } from '@providers/ITokenProvider';

import { HashProvider } from './HashProvider';
import { LocalStorageProvider } from './LocalStorageProvider';
import { TokenProvider } from './TokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<ITokenProvider>('TokenProvider', TokenProvider);

const storageProvider = {
  local: LocalStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[String(process.env.STORAGE_PROVIDER)]
);
