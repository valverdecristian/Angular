import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { ErrorComponent } from './pages/error/error.component';
import { AutosComponent } from './pages/autos/autos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'autos', component: AutosComponent },
  { path: 'db', component: AutosComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' },
];
