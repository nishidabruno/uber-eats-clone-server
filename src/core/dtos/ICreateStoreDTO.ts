interface ICreateStoreDTO {
  name: string;
  user_id: string;
  address: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  categories_id: string[];
  delivery_time: number;
  delivery_fee: number;
  opening_time_workweek: string;
  opening_time_weekend: string;
  image: string;
}

export { ICreateStoreDTO };
