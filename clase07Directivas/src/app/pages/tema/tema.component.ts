import { CurrencyPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ResaltarDirective } from '../../directives/resaltar.directive';

@Component({
  selector: 'app-tema',
  imports: [DatePipe, CurrencyPipe, NgClass, NgStyle, ResaltarDirective],
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent {
  juegos = signal([
    { id: 1, nombre: 'Ahorcado' },
    { id: 2, nombre: 'Mayor o Menor' },
    { id: 3, nombre: 'Preguntados' },
    { id: 4, nombre: 'Sudoku' },
  ]);

  // Signal booleana para mostrar contenido condicional
  mostrarInfo = signal(true);

  // Signal con fecha actual
  fecha = signal(new Date());

  moneda: number = 1000;

  destacado = signal(false);

  toggleDestacado() {
    this.destacado.update((v) => !v);
  }
}
