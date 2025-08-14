import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // inyeccion de dependencias

  @Get() // decorador con metodo HTTP GET
  getHello() {
    return this.appService.getHello();
  }

  @Post('/') // decorador con metodo HTTP POST
  postear(): string {
    return 'entre al POST';
  }
}
