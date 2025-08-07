import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';

// Inyeccion del servicio: hace que el servicio sea un singleton global
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient<any, 'public', any>;
  user = signal<User | null>(null);
  userDB = signal<Usuario | null>(null);
  router = inject(Router);
  supabaseUrl = 'https://wtjylfdfdwowzzvunlpa.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0anlsZmRmZHdvd3p6dnVubHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDI0ODMsImV4cCI6MjA2ODM3ODQ4M30.fqCZIiw9N8PMjyCKCH1378bztIChdLfisXbEzbIkEfE';

  constructor() {
    // iniciador del cliente Supabase
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

    // detectar cuando se inicia o cierra sesion
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(null);
        this.userDB.set(null);
        // this.router.navigateByUrl('/login');
        return;
      }

      this.supabase.auth.getUser().then((respuestaUsuarioAuth) => {
        this.user.set(respuestaUsuarioAuth.data.user);
        this.supabase
          .from('usuariosUID')
          .select('*')
          .eq('id', this.user()?.id)
          .single()
          .then((respuestaUsuarioDB) => {
            this.userDB.set(respuestaUsuarioDB.data as Usuario);
            console.log(this.user());
            console.log(this.userDB());
          });
        // this.router.navigateByUrl('/home');
      });
    });
  }

  // registro de usuario: sugnUp() para crear la cuenta
  async crearCuenta(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    edad: number
  ) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      // data.user es de tipo USER. USER define que id puede ser undefined.
      this.crearUsuarioDB(data.user!.id, email, nombre, apellido, edad);
    } else {
      throw error;
    }
  }

  // guardar datos en la base
  // es private porque primero quiero que se cree el usuario con autenticacion
  // y luego guardar los datos en la base de datos
  private async crearUsuarioDB(
    uid: string,
    email: string,
    nombre: string,
    apellido: string,
    edad: number
  ) {
    // inserta los datos del usuario en una tabla personalizada
    const { data, error } = await this.supabase.from('usuariosUID').insert({
      id: uid,
      email: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
    });

    if (error) {
      throw error;
    }
  }

  async iniciarSesion(email: string, password: string) {
    // usa signInWithPassword() para autenticar al usuario
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      throw error;
    }
  }

  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }
}
