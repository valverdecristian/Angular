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