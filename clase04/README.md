# Clase04

## SUPABASE

- Plataforma backend que ofrece servicios similares a Firebase.
- Se usa para gestionar nuestra base de datos, autenticacion, almacenamiento y funcionamiento en tiempo real.
- Base de datos PostgreSQL autoadministrada.

## 🚀 ¿Cómo integrar Supabase en un proyecto Angular?

1. Registrarse y crear un proyecto:
- ir a https://supabase.com/
- crear cuenta -> crear proyecto -> nos dara:
    * SUPABASE_URL
    * SUPABASE_ANON_KEY

2. Instalar el paquete de supabase en nuestro proyecto:

```bash
npm install @supabase/supabase-js
```

3. Crear el cliente de supabase indicando la URL de la organización y public-anon-key ubicados en la seccion Project Setting -> Data API -> API settings en tu proyecto:

```ts
// en database.service.ts
const supabase = createClient('https://wtjylfdfdwowzzvunlpa.supabase.co', 'public-anon-key')
```

4. En nuestro app.component.ts injectar:

```ts
databaseService = inject(DatabaseService);
```

5. Politicas de privacidad:
Es necesario crear una politica de privacidad para indicar que condiciones se deben cumplir para poder acceder a los datos de la tabla, de lo contrario la consulta a la misma devolvera un array vacio.
Otra opcion es deshabilitar (RLS) mientras está en modo desarrollo para acceder a los datos.

6. Insertar datos en tabla: utiliza los metodos from e insert para indicar el nombre de la tabla donde quieres insertar los datos y el objeto con los valores a insertar

```ts
export class DatabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.from("autos").insert([
      { marca: "Citroen", modelo: "C3", precio: 157000 }]).then(({ data, error }) => {
        console.log(data);
        console.log(error);
      });
  }
}
```

## Crear una bd en supabase

1. Ir a database
2. Crear nueva tabla

## Spread Operator

Sirve para descomponer un objeto en sus propiedades.
Se crea una nueva copia del objeto, extrayendo sus propiedades.