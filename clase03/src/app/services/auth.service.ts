import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // atributo usuario y metodo guardarUsuarios

  // usuario por defecto
  usuario = {
    nombre: "Usuario",
    apellido: "Defecto"
  }

  guardarUsuario(nombre: string, apellido: string) {
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    console.log("Usuario guardado:", this.usuario);
  }
}
