interface ICreateProductDTO {
  name: string;
  description: string;
  user_id: string;
  image: string;
  price: number;
  store_id?: string;
}

export { ICreateProductDTO };
