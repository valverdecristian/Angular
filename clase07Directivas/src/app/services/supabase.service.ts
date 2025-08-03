import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  createClient,
  RealtimeChannel,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;
  supabaseUrl = 'https://wtjylfdfdwowzzvunlpa.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0anlsZmRmZHdvd3p6dnVubHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDI0ODMsImV4cCI6MjA2ODM3ODQ4M30.fqCZIiw9N8PMjyCKCH1378bztIChdLfisXbEzbIkEfE';
  user = signal<User | null>(null);
  router = inject(Router);
  canal: RealtimeChannel;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    // en vez de escuchar todos los cambios, solo lo hacemos con la tabla especifica
    this.canal = this.supabase.channel('table-db-changes');
  }

  // metodo que se encarga de guardar un mensaje en nuestra bd
  async crear(mensaje: string, id_usuario: number) {
    await this.supabase
      .from('chat')
      .insert({ mensaje: mensaje, id_usuario: id_usuario });
  }

  traerEnTiempoReal(callback: (mensaje: Mensaje) => void) {
    this.canal
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat',
        },
        (payload) => {
          const nuevoMensaje = payload.new as Mensaje;
          callback(nuevoMensaje);
        }
      )
      .subscribe();
  }

  async obtenerMensajes(): Promise<Mensaje[]> {
    const { data, error } = await this.supabase
      .from('chat')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error al obtener mensajes:', error);
      return [];
    }

    return data as Mensaje[];
  }
}
