import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCalendarItem]',
})
export class CalendarItemDirective {
  isMouseDown = false;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (event.which === 1) {
      this.render.setStyle(event.target, 'background', '#66FF00');
      this.isMouseDown = true;
    }
  }

  @HostListener('mouseup') onMouseUp(event: Event) {
    this.isMouseDown = false;
  }

  @HostListener('mouseover', ['$event.target']) onMouseEnter(event: Event) {
    this.isMouseDown
      ? this.render.setStyle(event, 'background', '#66FF00')
      : null;
  }

  @HostListener('contextmenu', ['$event']) onRightClick(event: Event) {
    event.preventDefault();
    this.render.setStyle(event.target, 'background', '#ff0000');
  }
}
