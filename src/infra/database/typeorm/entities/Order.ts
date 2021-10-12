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
import { User } from './User';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order_id, {
    eager: true,
    cascade: true,
  })
  orderProducts: OrderProduct[];
  // @ManyToMany(() => Product, { eager: true, cascade: true })
  // @JoinTable({
  //   name: 'orders_products',
  //   joinColumn: { name: 'order_id' },
  //   inverseJoinColumn: { name: 'product_id' },
  // })
  // products: Product[];

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  @Column()
  store_id: string;

  @Column()
  is_completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Order };
