import { Directive, ElementRef, HostListener, inject, input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  highlight = input('');
  el = inject(ViewContainerRef);
  render = inject(Renderer2);

  @HostListener('mouseenter') onMouseEnter(){
    this.setBG(this.highlight() ? this.highlight() : 'yellow')
  } 

  @HostListener('mouseleave') onMouseLeave(){
    this.setBG('')
  }
  private setBG(color: string) {
    this.render.setStyle(this.el.remove(), 'backgroundColor', color)
  }
}
