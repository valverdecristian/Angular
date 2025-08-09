import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  
  // Inyectamos ElementRef para manipular el DOM
  // es mas moderno que usar el constructor
  private element = inject(ElementRef);

  // Usamos input para definir una propiedad que se puede cambiar
  // en app.component.html puedo cambiar el color -> appHighlight color="red"
  color = input("yellow");

  constructor() {
    // no recomendado en ambientes donde no se tiene acceso al DOM
    // no usa los decoradores @HostListener
    this.element.nativeElement.onmouseenter = () => {
      console.log("Clickeando", this.element.nativeElement.style.backgroundColor = this.color());
      
    }

    this.element.nativeElement.onmouseleave = () => {
      console.log("Saliendo", this.element.nativeElement.style.backgroundColor = "");
    }
  }

}