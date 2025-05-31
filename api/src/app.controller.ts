import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Ping de teste de disponibilidade da aplicação',
    description: 'Retorna uma mensagem de sucesso',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
