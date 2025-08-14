# 🚀 ANGULAR

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
6. ngOnDestroy() — Se ejecuta antes de destruir el componente, ideal para limpiar timers, subscripciones, etc.

- 🛠 IMPORTANTE: Angular recomienda que ESTOS METODOS SE USEN IMPLEMENTANDO LA _INTERFACE_ CORRESPONDIENTE. Así ts nos avisara si olvidamos escribir dicho método.
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

- Event Binding

## 📌 Directivas

- Estructural

  - Clasico: *ngIf, *ngFor, \*ngSwitch
  - Moderno: @if, @for, @switch, @case, @default

- Atributo

  - cambian la apariencia o comportamiento de un elemento existente. ngClass, ngStyle

- Personalizada
  - Comportamiento definido por nosotros.

## 📌 Formularios

### 📍 Formularios Reactivos

1. Estructura en ts: FormGroup, FormControl y FormBuilder
2. Se usan para validar (Validators), mostrar errores (FormControlName) y controlar campos dinámicos.

### 📍 Formularios por Template

- Uso de `ngModel`, `#templateRef`, validaciones con `required`, `minlength`, etc.
- Ideal para formularios simples y rapidos.

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
    1. Estas peticiones retornan un **Observable**, por lo que debe suscribirse con `.suscribe()`.
    2. Se recomienda usar **interceptores**.
  - Se usa para conectar la app con APIs REST.
  - Se debe configurar mediante inyección de dependencia.
  - Para proyectos **standalone (Angular 15+)**, se debe agregar `provideHttpClient()` en `providers` del archivo **app.config.ts**.
  - Funcion predeterminada: XMLHttpRequest
  - Funciones opcionales:
    1. withFetch()
    2. withInterceptors()

## 📌 Autenticacion

### 🔐 Autenticación con Supabase

- Supabase provee un sistema de autenticación completo (registro, login, sesión, recuperación).
- Utiliza JWT y permite autenticación con email/contraseña o OAuth (Google, GitHub, etc.).

### Metodos implementados

```ts
// Crear cuenta
supabase.auth.signUp({ email, password });

// Iniciar sesión
supabase.auth.signInWithPassword({ email, password });

// manejar el estado de sesión
supabase.auth.getSession(); // o
supabase.auth.onAuthStateChange();

// Cerrar sesión
supabase.auth.signOut();
```

## 📌 Guards

### 📍 ¿Como podemos hacer una navegacion anidada / navegacion hija?

- Usamos la propiedad `children` dentro del path principal.
- Los componentes hijos se renderizan dentro del `<router-outlet>` del componente padre.
- En el template del padre debe existir `router-outlet`

### 🚀 Concepto de Lazy Loading (Carga Perezosa)

- Significa que el componente/modulo se carga solo cuando se necesita (cuando se navega a esa ruta) no al inicio de la app.
- Uso: para mejorar el rendimiento inicial de carga (Time to Interactive).
- Se aplica a componentes con `loadComponent` o a modulos con `loadChildren`.

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

### 🛡️ Bloquear Rutas con Guards

- canActivate, canLoad, etc. (para proteger rutas)
- canDeactivate: para evitar que el usuario salga de una ruta sin guardar cambios.
- resolve: para cargar datos antes de rendeizar el componente.
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

## 📌 Pipes

Permiten transformar datos directamente en el template.

### 📍 Pipes nativos

- `date`: formatear fechas.
- `uppercase/lowercase`: convertir texto en mayusculas/minusculas.
- `currency`: muestra valor monetario local.
- `percent`: muestra porcentajes

### 📍 Pipes personalizados

```ts
ng generate pipe nombre-del-pipe
```

## 📌 `@HostListener` en Angular

Es un decorador que permite escuchar eventos del DOM (sin necesidad de usar addEventListener)

### ✅ Buenas Practicas

- Usar `Renderer2` junto con `@HostListener` para cambiar estilos, evitando modificar el DOM directamente.
- Mantener el código dentro de los métodos corto y claro.
- No abusar de eventos globales (window, document) para evitar afectar el rendimiento

## 📌 PWA

Una PWA (Progressive Web App) es una aplicacion web que se comporta como una app nativa en dispositivos moviles y de escritorio.

- Es una web que se puede instalar, usar offline, recibir notificaciones y que se cargue rápido.

### 🧩 Funcionalidad

- 📲 Instalacion: desde el navegador.
- 📡 Offline: gracias al Service Worker.
- 🔔 Notificaciones push: enviar notificaciones al usuario en todo momento.
- ⚡ Carga rapida: usa caché inteligente.
- 🧭 Experiencia nativa: se comporta como una app real.

### 🛠️ ¿Cómo convertir tu app Angular en PWA?

```bash
ng add @angular/pwa
```

Esto agrega:

- `manifest.webmanifest`: define ícono, nombre, colores, etc.
- `ngsw-config.json`: configuración del Service Worker.
- Archivos para caché, offline, instalación.

<br>

# 🚀 NestJS

NestJS es un framework backend para `Node.js` que permite crear aplicaciones del lado del servidor con una arquitectura **modular, escalable y profesional**, inspirada en Angular.

🚀 Ofrece estructura clara, inyección de dependencias, módulos reutilizables, servicios bien definidos y código limpio.

### 🧩 Características

- **Arquitectura modular**: organiza la app en `@Module`, `@Controller`, `@Service`.
- **Inyección de dependencias**: gestiona instancias de clases automáticamente.
- **TypeScript nativo**: tipado fuerte, decoradores, clases.
- **Compatible con Express y Fastify**: puede usar distintos motores HTTP.
- **Listo para APIs REST, GraphQL, WebSockets, JWT, etc.**
- **Testing integrado**: unitario y e2e con Jest.
- **Integraciones fáciles**: con bases de datos (TypeORM, Mongoose), colas de mensajes, autenticación, etc.
- **Soporte para WebSockets**: ideal para chats o apps en tiempo real.
- **CLI poderosa**: scaffolding de módulos, controladores, servicios.

### 🎯 ¿Para qué lo usaría?

- Crear APIs robustas y seguras.
- Desarrollar microservicios, gateways WebSocket (para tiempo real), y apps híbridas (REST + tiempo real).
- Backend profesional para proyectos Angular, React o móviles.

### ⚙️ Instalación de NestJS

1. Instalar la CLI de NestJS (globalmente)

```bash
npm i -g @nestjs/cli
```

2. Crear un nuevo proyecto NestJS

```bash
nest new nombre-del-proyecto
```

⚡️ Va a preguntar si queremos usar npm o yarn.

3. Entrar al proyecto y levantar el servidor.

```bash
cd nombre-del-proyecto
npm run start:dev
```

## 📦 Métodos HTTP en NestJS

Los métodos HTTP se usan dentro de los **controladores** para definir como responde nuestro backend a las distintas solicitudes del cliente.

```ts
Import {
    Get, Post, Put, Path, Delete
} from '@nestjs/common';
```

### 🧩 Ejemplo básico en un controlador

```ts
@Controller("usuarios")
export class UsuariosController {
  @Get()
  obtenerTodos() {
    return this.usuariosService.findAll();
  }

  @Post()
  crear(@Body() datos: CrearUsuarioDto) {
    return this.usuariosService.create(datos);
  }

  @Put(":id")
  actualizar(@Param("id") id: string, @Body() datos: ActualizarUsuarioDto) {
    return this.usuariosService.update(id, datos);
  }

  @Delete(":id")
  eliminar(@Param("id") id: string) {
    return this.usuariosService.remove(id);
  }
}
```

#### 💡 Bonus

- `@Param()`: para capturar parámetros de ruta (``:id`).
- `@Body()`: para recibir datos enviados en el cuerpo del request.
- `@Query()`: para capturar parámetros tipo `?filtro=activo`.

### 📍 Argumentos de Métodos HTTP

👉 Aplica a cualquier metodo http (@Get(), @Post(), @Put(), @Delete())

```ts
// Default
@Get()
```

- Si el controlador es @Controller('gatos'), esta ruta responde a GET /gatos

```ts
// Con segmento dinamico
@Get(':id')
```

- Captura el valor de `id` desde la URL
- Ejemplo: `GET /gatos/42` -> `@Param('id')` devuelve `"42"`

```ts
// Especificando una ruta
@Get('gatos/siames')
@Get(['gatos', 'siames'])
```

## 📌 Módulos

En NestJS, los módulos (`@Module`) son unidades organizativas, que agrupan componentes relacionados, como controladores, servicios, pipes, guards y otros modulos.
Cada aplicacion tiene al menos un módulo raiz (`AppModule`), pero lo mejor es dividirla en multiples modulos.

### 🧩 Estructura de un módulo

```ts
@Module({
  imports: [OtroModulo], // Reutilizar funcionales de otros modulos o integrar librerias
  controllers: [MiController], // Manejan las rutas HTTP. Recibe los datos del cliente. Decorador @Controller()
  providers: [MiService], // Lógica de negocio. Decorador @Injectable() y se inyectan en los controladores
  exports: [MiService], // Servicios que pueden ser usados por otros módulos
})
export class MiModulo {}
```

### 📍 DTO

Un DTO (`Data Transfer Object`) es una clase que define la forma y estructura de los datos que se reciben o envian entre el cliente y el servidor.

👉 Es como un contrato que dice: “si querés crear un usuario, estos son los campos que tenés que mandar, con estos tipos y validaciones”.

#### 🧩 ¿Para qué sirve?

- ✅ Validar los datos que llegan en el @Body().
- ✅ Evitar errores por datos mal formateados.
- ✅ Documentar claramente qué espera cada endpoint.
- ✅ Separar la lógica de negocio de la estructura de datos.
- ✅ Usar pipes como ValidationPipe para validar automáticamente.

#### 🎯 ¿Cuándo usar DTOs?

- En todos los endpoints que reciben datos (POST, PUT, PATCH).
- Para definir claramente qué espera tu API.
- Para proteger tu backend de datos maliciosos o incompletos.
