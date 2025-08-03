import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
})
export class ResaltarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#facc15');
    this.renderer.setStyle(
      this.el.nativeElement,
      'text-shadow',
      '0 0 6px #facc15'
    );
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
    this.renderer.removeStyle(this.el.nativeElement, 'text-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'cursor');
  }
}
