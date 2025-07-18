import { Component } from '@angular/core';
import { AltaAutoComponent } from './alta-auto/alta-auto.component';
import { ListadoAutoComponent } from './listado-auto/listado-auto.component';
import { DetalleAutoComponent } from './detalle-auto/detalle-auto.component';
import { Auto } from '../../models/auto';

@Component({
  selector: 'app-autos',
  imports: [AltaAutoComponent, ListadoAutoComponent, DetalleAutoComponent],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {
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
