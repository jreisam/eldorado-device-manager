import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty({
    description: 'ID da categoria do dispositivo',
    example: 1,
    type: Number,
    required: true,
  })
  @IsInt({ message: 'O ID da categoria deve ser um número inteiro' })
  category_id: number;

  @ApiProperty({
    description: 'Cor do dispositivo',
    example: 'Azul',
    maxLength: 16,
    pattern: '^[a-zA-Z\\s]+$',
    required: true,
  })
  @IsNotEmpty({ message: 'A cor é obrigatória' })
  @MaxLength(16, { message: 'A cor deve ter no máximo 16 caracteres' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'A cor deve conter apenas letras' })
  color: string;

  @ApiProperty({
    description: 'Número da peça do dispositivo',
    example: 12345,
    type: Number,
    required: true,
  })
  @IsInt({ message: 'O número da peça deve ser um número inteiro' })
  @IsPositive({ message: 'O número da peça deve ser um número positivo' })
  part_number: number;
}
