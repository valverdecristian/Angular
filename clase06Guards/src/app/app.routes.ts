import { Routes } from '@angular/router';
import { miGuardGuard } from './guards/mi-guard.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [miGuardGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'juegos',
    loadComponent: () =>
      import('./pages/juegos/juegos.component').then((m) => m.JuegosComponent),
    children: [
      {
        path: 'ahorcado',
        loadComponent: () =>
          import('./juegos/ahorcado/ahorcado.component').then(
            (m) => m.AhorcadoComponent
          ),
      },
      {
        path: 'mayormenor',
        loadComponent: () =>
          import('./juegos/mayor-menor/mayor-menor.component').then(
            (m) => m.MayorMenorComponent
          ),
      },
    ],
  },
];
