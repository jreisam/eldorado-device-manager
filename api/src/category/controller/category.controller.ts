import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@ApiTags('Categorias')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Cria uma nova Categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Retorna todas as categorias' })
  @ApiResponse({ status: 200, description: 'Retorna todas as categorias.' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Retorna uma categoria pelo id' })
  @ApiResponse({ status: 200, description: 'Retorna a categoria.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Remove uma categoria pelo id' })
  @ApiResponse({ status: 200, description: 'Categoria removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
