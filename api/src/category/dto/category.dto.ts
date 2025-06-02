import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'Nome da categoria do dispositivo',
    example: 'Smartphones',
    maxLength: 128,
    required: true,
  })
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @MaxLength(128, { message: 'O nome deve ter no máximo 128 caracteres' })
  name: string;
}
