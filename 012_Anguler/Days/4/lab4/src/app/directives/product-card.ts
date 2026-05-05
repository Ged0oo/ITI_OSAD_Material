import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductCard]',
  standalone: true,
})
export class ProductCard implements OnInit {

  @Input('appProductCard') BGColor: string = '#ffffff';

  private originalShadow = '0 2px 6px rgba(0,0,0,0.15)';
  private hoverShadow = '0 8px 20px rgba(0,0,0,0.35)';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const style = this.el.nativeElement.style;
    style.borderRadius = '12px';
    style.border = '1px solid #e0e0e0';
    style.boxShadow = this.originalShadow;
    style.padding = '12px';
    style.transition = 'box-shadow 0.25s ease-in-out';
    style.backgroundColor = this.BGColor || '#ffffff';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', this.hoverShadow);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', this.originalShadow);
  }
}
