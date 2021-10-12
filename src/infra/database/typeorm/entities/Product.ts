import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderProduct } from './OrderProduct';
import { Store } from './Store';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  @Column()
  store_id: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product_id)
  orderProducts: OrderProduct[];

  @Column()
  image: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Product };
