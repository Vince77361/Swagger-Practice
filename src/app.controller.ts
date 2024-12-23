import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Hello World!',
    description: 'Hello World를 받습니다.',
  })
  @ApiOkResponse({
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
