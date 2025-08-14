import { Module } from '@nestjs/common';
import { PerfilesController } from './perfiles.controller';

@Module({
  controllers: [PerfilesController]
})
export class PerfilesModule {}
