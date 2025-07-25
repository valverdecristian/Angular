import { Component } from '@angular/core';
import { Auto } from '../../models/auto';
import { AltaAutoComponent } from '../autos/alta-auto/alta-auto.component';
import { ListadoAutoComponent } from '../autos/listado-auto/listado-auto.component';
import { DetalleAutoComponent } from '../autos/detalle-auto/detalle-auto.component';

@Component({
  selector: 'app-autos-db',
  imports: [AltaAutoComponent, ListadoAutoComponent, DetalleAutoComponent],
  templateUrl: './autos-db.component.html',
  styleUrl: './autos-db.component.css'
})
export class AutosDBComponent {
  autos: Auto[] = [
    new Auto('Toyota', 'Corolla', 20000),
    new Auto('Ford', 'Focus', 22000),
    new Auto('Chevrolet', 'Cruze', 21000)
  ];

  autoSeleccionado?: Auto;

  agregarAuto(auto: Auto): void {
    this.autos.push(auto);
  }

  seleccionarAuto(auto: Auto): void {
    this.autoSeleccionado = auto;
  }

  eliminarAuto(auto: Auto): void {
    this.autos = this.autos.filter(a => a !== auto);
    if (this.autoSeleccionado === auto) {
      this.autoSeleccionado = undefined;}
  }

  eliminarPorIndice(indice: number){
    this.autos.splice(indice, 1);
  }
}
