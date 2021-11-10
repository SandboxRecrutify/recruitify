import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[selectbox]',
  exportAs: 'selectboxAs'
})
export class Selectbox implements OnInit {
  @Input('selectbox') propIn!: boolean;
  @Output('selectboxChange') update = new EventEmitter();

  isSelected!: boolean;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isSelected = this.propIn;
  }

  @HostListener("click") onMouseEnter() {
    this.isSelected = !this.isSelected;
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', this.isSelected ? 'bold' : 'normal')
  }
}