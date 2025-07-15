import { Component, output } from '@angular/core';
import { Auto } from '../../../models/auto';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-auto',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alta-auto.component.html',
  styleUrl: './alta-auto.component.css'
})
export class AltaAutoComponent {
  formulario: FormGroup;
  enviarAuto = output<Auto>();

  constructor() {
    this.formulario = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      precio: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  guardar() {
    if(!this.formulario.valid) {
      return;
    }

    const auto: Auto = new Auto(
      this.formulario.value.marca,
      this.getModelo,
      this.formulario.value.precio);

      console.log(auto);
      
    // emit del output
    this.enviarAuto.emit(auto);
  }

  get getModelo() {
    return this.formulario.controls["modelo"].value ;
  }
}
