interface IStorageProvider {
  save(fileName: string, folder: string): Promise<void>;
  delete(fileName: string, folder: string): Promise<void>;
}

export { IStorageProvider };
