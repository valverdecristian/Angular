import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  // Inyectamos el servicio AuthService (forma moderna)
  auth = inject(AuthService);

  // Definimos un FormGroup para manejar el formulario
  form?: FormGroup;

  // creamos una flag para indicar si hay un error en validarFormulario
  flag: boolean = false;

  ngOnInit(): void {
    console.log(this.auth.usuario);
    

    // FormGroup es un agrupador de controles de formulario
    this.form = new FormGroup({

      // FormControl: valor inicial y validaciones
      nombre: new FormControl(
        "", 
        {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required, Validators.pattern("^[a-zA-Z]*")]}
      ),
      apellido: new FormControl(
        "",
        {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required, Validators.pattern("^[a-zA-Z]*")]}
      )
    });
  }

  mostrarFormulario() {
    // Aquí podrías manejar el envío del formulario, por ejemplo, enviarlo a un servicio
    console.log(this.form);
    console.log(this.form?.controls);
  }

  validarFormulario() {
    // Validamos el formulario
    this.flag = true;
    console.log("Es valido: " + this.form?.valid);
    console.log(this.form?.controls["nombre"].errors);
    console.log(this.form?.controls["apellido"].errors);
  }

  guardarDatos(){
    if (!this.form?.valid) {
      console.log("Formulario no válido");
      return;
    }

    console.log(this.form.value);

    // con esto logramos que se logre en nuestro servicio AuthService
    this.auth.guardarUsuario(this.getNombre?.value, this.getApellido?.value);
  }

  get getNombre() {
    return this.form?.get("nombre");
  }

  get getApellido() {
    return this.form?.get("apellido");
  }
}
