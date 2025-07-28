import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "registro", component: RegistroComponent},
    {path: "home", component: HomeComponent},
    {path: "error", component: ErrorComponent},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "**", redirectTo: "error"}
];
