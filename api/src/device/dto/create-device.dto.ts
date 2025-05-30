import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateDeviceDto {
  @IsInt()
  @IsPositive()
  category_id: number;

  @IsNotEmpty()
  @MaxLength(16)
  @Matches(/^[a-zA-Z]+$/, { message: 'Color must contain only letters' })
  color: string;

  @IsInt()
  @IsPositive()
  part_number: number;
}
