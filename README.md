## 📌 Componentes

Los componentes son clases, pero las clases no son componentes. Todos los componentes son de instancia. La clase se convierte en un componente por el decorador @Component.

```ts
ng generate component NOMBRE_CARPETA/otra_carpeta
```

### 📍 Ciclo de vida de un componente

1. constructor() — Se ejecuta al crear la instancia de la clase (no accede aún al HTML).
2. ngOnChanges() — Se ejecuta cuando cambian los inputs del componente (si hay @Input()).
3. ngOnInit() — Se ejecuta una sola vez, cuando Angular ya terminó de inicializar el componente.
4. ngDoCheck() — Se ejecuta cuando Angular verifica cambios (ciclo de detección).
5. ngAfterContentInit() — Se ejecuta después de que el contenido del componente ha sido inicializado.
5. ngOnDestroy() — Se ejecuta antes de destruir el componente, ideal para limpiar timers, subscripciones, etc.

- 🛠 IMPORTANTE: Angular recomienda que ESTOS METODOS SE USEN IMPLEMENTANDO LA *INTERFACE* CORRESPONDIENTE. Así ts nos avisara si olvidamos escribir dicho método.
- Los mas usados serian: OnInit y OnDestroy.

### 📍 Comunicacion entre componentes

- Input clasico (@input): Decorador para recibir datos del padre.
- Input moderno (InputSignal): Nueva forma reactiva.
- Output (@Output): Decorador para emitir eventos hacia el padre.


## 📌 Blindeo

### 📍 Desde el TS al HTML

- Interpolacion: {{variable}}
- Atributo: [atributo]="valor"

### 📍 Desde el HTML al TS

- Event Blinding

## 📌 Directivas

- Estructural
    * Clasico: *ngIf, *ngFor, *ngSwitch
    * Moderno: @if, @for, @switch, @case, @default

- Atributo
    * cambian la apariencia o comportamiento de un elemento existente. ngClass, ngStyle

- Personalizada
    * Comportamiento definido por nosotros.

## 📌 Formularios

### 📍 Formularios Reactivos

1) Estructura en ts: FormGroup, FormControl y FormBuilder
2) Se usan para validar (Validators), mostrar errores (FormControlName) y controlar campos dinámicos.

### 📍 Formularios por Template

## 📌 Inyeccion de dependencias (DI)

- Angular usa DI (Dependency Injection) para no acoplar codigo.
- Un servicio es una clase que encapsula lógica y datos compartidos.

### 📍 Creando un servicio Inyectable

```ts
ng generate service <RUTA AL ARCHIVO>
```

### 📍 Dos formas de inyectar un servicio:

- Antes (Clasica): a través del contructor, por parámetro llegaba un servicio (accesibilidad, nombre y servicio) Ejemplo: constructor (private auth: AuthService) {...}
- Moderna (Angular 14+): auth = inject(AuthService);
- ✅ Usar la nueva inject() para menos codigo y mas claridad (sobre todo en signals o standalone components)

### 📍 Patrón SINGLETON

- ✔️ Cuando registrás un servicio como providedIn: 'root', Angular lo mantiene como Singleton.
- ✔️ Esto significa que solo existe UNA instancia en toda la app.
- ✔️ Todos los componentes o servicios que lo inyecten trabajan con la misma instancia, compartiendo datos y estado.

### 📍 Mini resumen del flujo

- ng generate service crea el archivo y lo hace @Injectable.
- Lo registrás como providedIn: 'root' para que sea Singleton.
- Lo inyectás donde lo necesites (constructor o inject()).
- Lo usás para compartir lógica y datos entre componentes.

### 📍 Servicios vs. Input/Output en Angular

- ✅ Input/Output:
	- Comunicación directa entre padre e hijo. Emitir eventos hacia arriba (al padre).
	- Padre → Hijo → Padre (solo jerarquía directa)
- ✅ Servicios:
	- Compartir estado entre componentes, logica de negocio y conexiones a APIs, datos persistentes y no hay relacion directa Padre-Hijo.
	- Compartir estado global o logica entre componentes que no tienen jerarquia directa → todos usan la misma instancia (Singleton)

### 👉 Ejemplo real

- ❌ Mal uso de Input/Output:
- Pasar datos entre componentes hermanos lejanos propagando Output por 4 niveles de padres → confuso, frágil.
- ✅ Buen uso de Servicio:
- Crear un UserService que maneje el usuario logueado → todos los componentes leen/escriben ese dato sin importar dónde estén.

### 📍 Comunicación con servicios backend mediante HTTP

- **`HttpClient`**:
    - Para hacer peticiones HTTP (GET, POST, PUT, DELETE).
        1) Estas peticiones retornan un **Observable**, por lo que debe suscribirse con `.suscribe()`.
        2) Se recomienda usar **interceptores**.
    - Se usa para conectar la app con APIs REST.
    - Se debe configurar mediante inyección de dependencia.
    - Para proyectos **standalone (Angular 15+)**, se debe agregar `provideHttpClient()` en `providers` del archivo **app.config.ts**.
    - Funcion predeterminada: XMLHttpRequest
    - Funciones opcionales:
        1) withFetch()
        2) withInterceptors()


## 📌 Autenticacion

### 📍 Autenticación con Supabase

- Supabase provee un sistema de autenticación completo (registro, login, sesión, recuperación).
- Utiliza JWT y permite autenticación con email/contraseña o OAuth (Google, GitHub, etc.).

### Metodos implementados

```ts
// Crear cuenta
supabase.auth.signUp({ email, password })

// Iniciar sesión
supabase.auth.signInWithPassword({ email, password })

// Cerrar sesión
supabase.auth.signOut()
```

## 📌 Guards

### 📍 ¿Como podemos hacer una navegacion anidada / navegacion hija?

- Usamos la propiedad `children` dentro del path principal.
- Los componentes hijos se renderizan dentro del <router-outlet> del componente padre.
- En el template del padre debe existir router-outlet

### 📍 Concepto de Lazy Loading (Carga Perezosa)

- Significa que el componente/modulo se carga solo cuando se necesita (cuando se navega a esa ruta) no al inicio de la app.
- Uso: para mejorar el rendimiento inicial de carga.
- Se aplica a componentes con loadComponent o a modulos con loadChildren.

```ts
{
  path: 'home',
  loadComponent: () => import('./pages/home/home.component')
    .then(m => m.HomeComponent)
}
```

- Ejemplo con loadChildren (para modulos)
```ts
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule)
}
```

### 📍 Bloquear Rutas con Guards

- canActate, canLoad, etc. (para proteger rutas)
- Se usan para controlar el acceso a rutas basándose en condiciones (por ejemplo si el usuario esta logueado)
- Un `guard` es una clase que decide si una ruta puede ser accedida o no.
- Si el guard devuelve un false o un observable que emite false, la navegacion se cancela.

```ts
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent),
  canActivate: [AuthGuard]
}
```