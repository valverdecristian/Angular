import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  auth = inject(AuthService);
  title = 'clase08';

  constructor() {
  }

  iniciarSesion() {
    this.auth.iniciarSesion('user5@gmail.com','123456');
    console.log("se inicio sesion");
    
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  crearCuenta() {
    this.auth.crearCuenta('user5@gmail.com','123456', 'User5', 'Cinco', 25);
    console.log("se creo la cuenta");
    
  }
}
