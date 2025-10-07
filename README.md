# 🚀 ANGULAR

- Es un framework desarrollado por Google.

## 📌 Componentes

Los componentes son clases, pero las clases no son componentes. Todos los componentes son de instancia. La clase se convierte en un componente por el decorador `@Component`.

```ts
ng g c nombre
```

### 📍 Ciclo de vida de un componente

1. `constructor()` — Se ejecuta al crear la instancia de la clase (no accede aún al HTML).
2. `ngOnChanges()` — Se ejecuta cuando cambian los inputs del componente (si hay `@Input()`).
3. `ngOnInit()` — Se ejecuta una sola vez, cuando Angular ya terminó de inicializar el componente.
4. `ngDoCheck()` — Se ejecuta cuando Angular verifica cambios (ciclo de detección).
5. `ngAfterContentInit()` — Se ejecuta después de que el contenido del componente ha sido inicializado.
6. `ngOnDestroy()` — Se ejecuta antes de destruir el componente, ideal para limpiar timers, subscripciones, etc.

- 🛠 IMPORTANTE: Angular recomienda que estos **metodos** se usen implementando la **interface** correspondiente. Así TypeScript nos avisara si olvidamos escribir dicho método.
- Los mas usados serian: `OnInit()` y `OnDestroy()`.

### 📍 Comunicacion entre componentes

- Input clasico (`@input`): Decorador para recibir datos del padre.
- Input moderno (`InputSignal`): Nueva forma reactiva.
- Output (`@Output`): Decorador para emitir eventos hacia el padre.

<br>

## 📌 Blindeo

### 📍 Desde el TS al HTML

- Interpolacion: {{variable}}
- Atributo: [atributo]="valor"
- funciones: (funcion)="metodo()"

### 📍 Desde el HTML al TS

- Event Binding:

<br>

## 📌 Directivas

- **Estructural**

  - Clasico: `*ngIf`, `*ngFor`, `*ngSwitch`
  - Moderno: @if, @for, @switch, @case, @default

- **Atributo**

  - Cambian la apariencia o comportamiento de un elemento existente. Ejemplo: `ngClass`, `ngStyle`

- **Personalizada**

  - Comportamiento definido por nosotros.

<br>

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
  - Se debe cerrar la suscripcion con `.unsubscribe()`
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

Los métodos HTTP se usan dentro de los **controladores** para manejar las rutas:

```ts
Import {
    Get, Post, Put, Patch, Delete, Body, Param, Query
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

### 🛡️ Validación de Datos

Para asegurar que los datos de entrada (payload) sean correctos, NestJS utiliza DTOs junto con ValidationPipe.

Para que la validacion funcione con los decoradores de clase, se necesitan dos paquetes:
- class-validator: para usar los decoradores de validación como @IsString(), @IsInt, etc.
- class-transformer: para transformar el objeto JSON de la petición en una instancia de la clase DTO

```bash
npm i --save class-validator class-transformer
```

#### Activacion global

La mejor práctica es configurarlo **globalmente** para que se aplique a **todos** los endpoints de la aplicación, evitando repetirlo en cada controlador.

```ts
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🚀 Aplica el ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      // Opciones clave para mayor seguridad y robustez
      whitelist: true,         // 🛡️ Ignora y elimina propiedades que NO estén definidas en el DTO.
      forbidNonWhitelisted: true, // 🛑 Lanza un error si hay propiedades no definidas en el DTO.
      transform: true,         // 🔄 Asegura que los tipos se transformen al DTO.
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

- ✅ whitelist: true elimina silenciosamente cualquier campo que no esté definido en el DTO.
- 🛑 Para que se lance un error ante campos no permitidos, agregá también forbidNonWhitelisted: true.

#### Uso en el controlador

Una vez configurado globalmente, solo necesitas usar el DTO en la firma del controlador. El Pipe hará el resto.

```ts
// usuarios.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/crear-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  @Post()
  // El ValidationPipe global actúa automáticamente sobre @Body()
  create(@Body() datos: CreateUsuarioDto) { 
    // Si llegamos aquí, 'datos' ya está validado y es una instancia de CrearUsuarioDto
    return this.usuariosService.create(datos);
  }
}
```

✅ Tip: Para que decoradores como @IsInt() y @Min() funcionen correctamente, activá transform: true en el ValidationPipe. Esto convierte automáticamente los tipos (por ejemplo, "42" → 42) antes de validar.

### 🛡️ Pipes y Guards

- **Pipes**: transforman y validan datos antes de que lleguen al controlador. Ej: `ValidationPipe`.
- **Guards**: controlan el acceso a rutas. Ej: `AuthGuard` para verificar si el usuario está autenticado.

Se pueden aplicar a nivel de método, controlador o módulo.

```ts
@UseGuards(AuthGuard)
@Get()
obtenerPrivado() {
  return 'Solo usuarios autenticados';
}

@UsePipes(ValidationPipe)
@Post()
crear(@Body() dto: CrearDto) {
  return servicio.crear(dto);
}
```

## 📌 Conexion a la Base de Datos

### 📍 MongoDB

- Para integrar MongoDB con NestJS, se debe intalar el siguiente paquete:

```bash
npm i @nestjs/mongoose mongoose
```

- Tambien instalar el paquete de NestConfig para manejar variables de entorno.

```bash
npm i @nestjs/config
```

- Una vez instalado NestConfig crear el archivo `.env` (en la raiz del proyecto) para poder usar las variables luego.
- Guardar la URI en una variable de entorno.
- Se debe importar NestConfig y Mongoose en `app.module.ts`.
- `isGlobal: true`: permite que el modulo de configuración (`ConfigModule`) este disponible **automáticamente en todos los módulos** del proyecto, **sin necesidad de importarlo nuevamente** cada vez que querés usar `process.env` o `ConfigService`

```ts
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    // actualizacion: se agrego { isGlobal: true }
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

### 📍 Definicion de Esquemas

- Nest usa decoradores para definir los **esquemas de MongoDB** de forma declarativa y tipada.
- PRINCIPALES DECORADORES:
1. `@Schema()`: marca la clase como esquema de MongoDB.
2. `@Prop()`: define cada propiedad y sus opciones (type, required, default, enum, etc).
- 👉 Hay mas formas de crear un esquema.

```ts
// usuario.entity.ts

export type UsuarioDocument = HydratedDocument<Usuario>; // se usa en nuestros servicios

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  edad: number;
}
```

- Luego se genera el esquema con:

```ts
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
```


### 📍 Registro del Esquema en el Módulo

- **Esta parte es clave**: cada módulo que usa un modelo debe registrarlo con MongooseModule.forFeature(...)
- Siguiendo el ejemplo se debe configurar en usuarios.module.ts:

```ts
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
```

- 🔍 Esto permite que el modelo Usuario esté disponible para inyectarlo en el servicio (`usuarios.service.ts`) con @InjectModel(...).

- en el servicio (`usuarios.service.ts`) usar UsuarioDocument como tipo generico para `Model<>`.
- Usuario es solo la clase que define el esquema (las propiedades).
- UsuarioDocument incluye además:
  * Métodos de Mongoose (save(), populate(), etc.).
  * Propiedades como _id, createdAt, updatedAt.
  * Tipado completo del documento que devuelve la base de datos.