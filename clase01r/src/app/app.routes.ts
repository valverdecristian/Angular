import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BlindeoComponent } from './components/blindeo/blindeo.component';

// Definir una ruta
// 1. Cual es la ruta
// 2. Que componente se va a mostrar

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "bienvenida", component: BienvenidaComponent},
    {path: "error", component: ErrorComponent},
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "blindeo", component: BlindeoComponent},
    // comodin siempre al final
    {path: "**", redirectTo: "error", pathMatch: "full"}
];