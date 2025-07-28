import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Auto } from '../models/auto';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  supabase: SupabaseClient;
  canal: RealtimeChannel;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl,environment.supabaseKey);

    this.canal = this.supabase
      .channel('public:autos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'autos' }, (payload) => {
        // esto solo se ejecuta algun cambio en la tabla autos
        console.log('Nuevo cambio:', payload);
      })
      .subscribe();

    this.obtenerTodosLosAutos();
  }

  insertarAuto(marca: string, modelo: string, precio: number): void {
    this.supabase
      .from('autos')
      .insert({ marca, modelo, precio })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al insertar auto:', error.message);
        } else {
          console.log('Auto insertado correctamente:', data);
        }
      });
  }

  obtenerTodosLosAutos() {
    this.supabase
      .from('autos')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al obtener autos:', error.message);
        } else {
          console.log('Autos obtenidos correctamente:', data);
        }
      });
  }

  eliminarAuto(id: number): void {
    this.supabase
      .from('autos')
      .delete()
      .eq('id', id)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al eliminar auto:', error.message);
        } else {
          console.log(`Auto eliminado correctamente: id ${id}`, data);
        }
      });
  }

  actualizarAuto(
    id: number,
    marca: string,
    modelo: string,
    precio: number
  ): void {
    this.supabase
      .from('autos')
      .update({ marca, modelo, precio })
      .eq('id', id)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al actualizar auto:', error.message);
        } else {
          console.log(`Auto actualizado correctamente: id ${id}`, data);
        }
      });
  }

  async crear(auto: Auto) {
    console.log('llega el servicio');

    const { data, error } = await this.supabase.from('autos').insert([auto]);
  }

  async listar(): Promise<Auto[]> {
    const { data, error } = await this.supabase.from('autos').select('*');
    if (error) {
      console.error('Error al listar autos:', error.message);
      return [];
    }
    return data as Auto[];
  }
}