import { Component, input, output } from '@angular/core';
import { Auto } from '../../../models/auto';

@Component({
  selector: 'app-listado-auto',
  imports: [],
  templateUrl: './listado-auto.component.html',
  styleUrl: './listado-auto.component.css'
})
export class ListadoAutoComponent {
  autos = input<Auto[]>([]);
  autoSeleccionado = output<Auto>();
  autoEliminar = output<Auto>();

  seleccionarUnAuto(auto: Auto): void {
    this.autoSeleccionado.emit(auto);
  }
}
