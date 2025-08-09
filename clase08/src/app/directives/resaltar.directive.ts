import { Directive, ElementRef, Renderer2, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
})
export class ResaltarDirective {

  constructor(private el: ElementRef, private renderer: Renderer2){}
  color = input('#facc15');

  // Con @HostListener podemos escuchar eventos de forma Angular-Friendly
  // Usa Renderer2 para manipular estilos de manera segura
  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color());
    this.renderer.setStyle(
      this.el.nativeElement,
      'text-shadow',
      '0 0 6px #facc15'
    );
    
    // Cambia el cursor al pasar el mouse
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
    this.renderer.removeStyle(this.el.nativeElement, 'text-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'cursor');
  }

}