import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { DeviceService } from '../service/device.service';

@ApiTags('Dispositivos')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo dispositivo' })
  @ApiResponse({ status: 201, description: 'Dispositivo criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os dispositivos' })
  @ApiResponse({ status: 200, description: 'Retorna todos os dispositivos.' })
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um dispositivo pelo id' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado.' })
  @ApiResponse({ status: 404, description: 'Dispositivo não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um dispositivo pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Dispositivo removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Dispositivo não encontrado.' })
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
