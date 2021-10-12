interface IHashProvider {
  hash(text: string, salts: number): Promise<string>;
  compare(text: string, hash: string): Promise<boolean>;
}

export { IHashProvider };
