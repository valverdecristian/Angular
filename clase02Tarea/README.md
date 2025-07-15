# Clase02Tarea

## 📋 TAREA - Input y Output

1. Crear un proyecto vacío.

```bash
ng new clase02Tarea
```

2. Crear las pages: Login, Bienvenida, Error, Autos y sus respectivas rutas en el router.

```bash
ng g c pages/login
ng g c pages/bienvenida
ng g c pages/error
ng g c pages/autos
```

app.routes.ts
```ts
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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' },
];
```

3. Buscar en internet plantillas HTML, para login, bienvenida y error.
Nota también pueden hacer la suya propia, pero no recomiendo que usen su tiempo en eso.
Links de paginas que tienen ejemplos:
- https://getbootstrap.com/docs/5.3/examples
- https://plantillashtmlgratis.com
- https://cssauthor.com/html5-and-css3-login-forms/

4. Crear los componentes: alta-auto, listado-auto, detalle-auto.

```bash
ng g c pages/autos/alta-auto
ng g c pages/autos/listado-auto
ng g c pages/autos/detalle-auto
```

5. Hacer los componentes del punto 4 hijos de la page Auto.

6. Crear la clase Auto, la cual cuenta con los atributos:
- marca:string, modelo:string, precio:number

```ts
// ng g cl models/Auto
export class Auto {
    constructor (
        public marca: string,
        public modelo: string,
        public precio: number
    ) {}
}
```

7. En la page Auto crear un array de Autos.



8. El componente alta-auto posee los inputs para cargar un auto y un output para enviarlo al componente padre.
9. El componente listado-auto muestra el listado de autos por input.
10. El componente listado-auto envia por output un auto seleccionado. Nota: agregar un botón a cada elemento del @for.
11. La page Auto recibe el auto seleccionado y lo envia al componente detalle-auto.
12. El componente detalle-auto muestra el auto seleccionado del listado.
13. El componente listado-auto posee un botón para eliminar el auto seleccionado del array ubicado en el componente padre (output)