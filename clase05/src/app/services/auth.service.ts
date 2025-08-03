import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient;

  user = signal<User | null>(null);
  router = inject(Router);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // detectar cuando se inicia o cierra sesion
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(null);
        this.router.navigateByUrl('/login');
        return;
      }

      this.supabase.auth.getUser().then(({ data, error }) => {
        this.user.set(data.user);
        this.router.navigateByUrl('/');
      });
    });
  }

  // crear cuenta
  async crearCuenta(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  // iniciar seccion
  async iniciarSesion(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  // cerrar seccion
  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  // detectar cuando se inicia o cierra sesion
}
