import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoDto } from './create-alumno.dto';

// El PartialType permite que no se carguen los datos si son nulos
export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {}
