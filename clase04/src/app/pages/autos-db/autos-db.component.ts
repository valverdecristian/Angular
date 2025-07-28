import { Component, inject, OnInit, signal } from '@angular/core';
import { Auto } from '../../models/auto';
import { AltaAutoComponent } from '../autos/alta-auto/alta-auto.component';
import { ListadoAutoComponent } from '../autos/listado-auto/listado-auto.component';
import { DetalleAutoComponent } from '../autos/detalle-auto/detalle-auto.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-autos-db',
  imports: [AltaAutoComponent, ListadoAutoComponent, DetalleAutoComponent],
  templateUrl: './autos-db.component.html',
  styleUrl: './autos-db.component.css'
})
export class AutosDBComponent implements OnInit {
  db = inject(DatabaseService);
  autos = signal<Auto[]>([]);

  // async permite que el array de autos se actualice en los lugares donde es leido
  ngOnInit(){
    this.db.canal.on('postgres_changes', {
      event: '*',
      schema: 'public'
    }, (payload) => {

      switch(payload.eventType) {
        case 'INSERT':
          const nuevoAuto = payload.new as Auto;
          // ❌ el problema esta aca en this.autos.update no es reactivo
          // ❌ el cambio se efectua en supabase, pero no se renderiza en la vista
          this.autos.update((autos) => {
            autos.push(nuevoAuto);
            return [...autos];
          });
          break;
        case 'UPDATE':
          const autoActualizado = payload.new as Auto;
          
          break;
        case 'DELETE':
          const autoEliminado = payload.old as Auto;
          break;
      }
      console.log('Nuevo cambio:', payload);
    });

    this.db.canal.subscribe();

    this.db.listar().then(autos => {
      this.autos.set(autos);
    });
  }

  autoSeleccionado?: Auto;

  agregarAuto(auto: Auto): void {
    // this.autos.push(auto);
    this.db.crear(auto);
  }

  seleccionarAuto(auto: Auto): void {
    this.autoSeleccionado = auto;
  }

  eliminarAuto(auto: Auto): void {
    const nuevaLista = this.autos().filter(a => a !== auto);
    this.autos.set(nuevaLista);

    if (this.autoSeleccionado === auto) {
      this.autoSeleccionado = undefined;}
  }

  eliminarPorIndice(indice: number){
    // borra localmente el auto del array
    this.autos().splice(indice, 1);

    // borra el auto de la base de datos
    // this.db.eliminarAuto(indice);
  }
}
