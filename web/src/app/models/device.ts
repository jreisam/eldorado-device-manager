import { Category } from './category';

export interface Device {
  id?: number;
  category_id: number;
  color: string;
  part_number: number;
  category?: Category;

}
