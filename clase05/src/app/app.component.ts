import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clase05';

  authService = inject(AuthService);

  ngOnInit() {
  }

  crearCuenta() {
    this.authService.crearCuenta(environment.email1, environment.pw1).then(() => {
      console.log('Cuenta creada exitosamente');
    }).catch(error => {
      console.error('Error al crear la cuenta:', error);
    });
  }

  iniciarSeccion() {
    this.authService.iniciarSesion(environment.email1, environment.pw1).then(() => {
      console.log('Sesión iniciada exitosamente');
    }).catch(error => {
      console.error('Error al iniciar sesión:', error);
    });
  }

  cerrarSeccion() {
    this.authService.cerrarSesion().then(() => {
      console.log('Sesión cerrada exitosamente');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
