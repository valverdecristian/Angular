import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-blindeo',
  imports: [FormsModule, BienvenidaComponent, LoginComponent],
  templateUrl: './blindeo.component.html',
  styleUrl: './blindeo.component.css'
})
export class BlindeoComponent {  title = 'blindeo';
  estilos = "rojo";
  nombre = "";

  mostrarTitulo() {
    this.estilos = "verde";
    alert(this.title);
  }

  borrarNombre() {
    this.nombre = "";
  }
}
