interface IOrderProduct {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at: Date;
}

export { IOrderProduct };
