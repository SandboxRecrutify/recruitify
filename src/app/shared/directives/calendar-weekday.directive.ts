import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCalendarWeekday]',
})
export class CalendarWeekdayDirective implements OnInit {
  @Input('day') day!: number;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('mousedown', ['$event']) resetMousedown(event: Event) {
    if (this.day === 0 || this.day === 6) {
      event.stopPropagation();
    }
  }

  @HostListener('mouseup', ['$event']) resetMouseup(event: Event) {
    if (this.day === 0 || this.day === 6) {
      event.stopPropagation();
    }
  }

  @HostListener('mouseover', ['$event']) resetMouseover(event: Event) {
    if (this.day === 0 || this.day === 6) {
      event.stopPropagation();
    }
  }

  ngOnInit(): void {
    if (this.day === 0 || this.day === 6) {
      this.render.setStyle(this.el.nativeElement, 'background', '#B9BDB6');
      this.render.setStyle(this.el.nativeElement, 'opacity', '0.6');
    }
  }
}
