import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column({ length: 16 })
  color: string;

  @Column()
  part_number: number;

  @ManyToOne(() => Category, (category) => category.devices)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
