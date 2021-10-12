interface IUser {
  id: string;
  full_name: string;
  email: string;
  role?: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export { IUser };
