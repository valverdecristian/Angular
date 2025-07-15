import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Injectar el servicio HttpClient
  httpClient = inject(HttpClient);

  pokemonActual: any; // Variable para guardar el pokemon actual

  // Utilizar el HttpClient para traer algo

  constructor() { }

  traerPorNombre(nombre: string) {
    // Creamos una peticion
    const peticion = this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/" + nombre)

    // Nos suscribimos a la peticion y definimos que hacer con la respuesta
    const suscripcion: Subscription = peticion.subscribe((respuesta) => {
      this.pokemonActual = respuesta;
      
      // Cerrar la suscripcion
      suscripcion.unsubscribe();
    });

  }
}
