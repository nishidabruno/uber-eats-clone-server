interface ICreateOrderDTO {
  user_id: string;
  store_id: string;
  orderProducts: {
    product_id: string;
    quantity: number;
  }[];
}

export { ICreateOrderDTO };
