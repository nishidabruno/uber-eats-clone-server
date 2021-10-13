interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  store_id?: string;
  created_at: Date;
  updated_at: Date;
}

export { IProduct };
