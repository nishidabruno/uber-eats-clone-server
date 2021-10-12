import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './Order';
import { Product } from './Product';

@Entity('orders_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  @Column()
  order_id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}

export { OrderProduct };
