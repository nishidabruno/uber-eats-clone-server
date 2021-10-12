import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Store } from './Store';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToMany(() => Store)
  @JoinTable({
    name: 'stores_categories',
    joinColumns: [{ name: 'category_id' }],
    inverseJoinColumns: [{ name: 'store_id' }],
  })
  stores: Store[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Category };
