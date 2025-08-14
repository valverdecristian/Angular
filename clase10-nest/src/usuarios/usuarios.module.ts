import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { PerfilesModule } from './perfiles/perfiles.module';

@Module({
  controllers: [UsuariosController],
  imports: [PerfilesModule]
})
export class UsuariosModule {}
