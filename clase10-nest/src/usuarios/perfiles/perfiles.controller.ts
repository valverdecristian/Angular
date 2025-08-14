import { Controller, Get } from '@nestjs/common';

@Controller('perfiles')
export class PerfilesController {
  @Get()
  perfiles() {
    return 'perfiles';
  }
}
