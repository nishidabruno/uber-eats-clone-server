import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from './Category';
import { Product } from './Product';
import { StoreCoordinates } from './StoreCoordinates';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  address: string;

  @Column()
  delivery_time: number;

  @Column()
  delivery_fee: number;

  @Column()
  opening_time_workweek: string;

  @Column()
  opening_time_weekend: string;

  @Column()
  image: string;

  @OneToOne(() => StoreCoordinates, { eager: true })
  @JoinColumn({ name: 'coordinates_id' })
  @Column()
  coordinates_id: string;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable({
    name: 'stores_categories',
    joinColumns: [{ name: 'store_id' }],
    inverseJoinColumns: [{ name: 'category_id' }],
  })
  categories: Category[];

  @OneToMany(() => Product, (product) => product.store_id, { eager: true })
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Store };
