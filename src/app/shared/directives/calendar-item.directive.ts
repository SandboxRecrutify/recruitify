import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appCalendarItem]',
})
export class CalendarItemDirective implements OnInit {
  @Input('day') day!: number;
  isMouseDown = false;
  today = new Date().getDay();

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMouseDown(event: Event | any) {
    let isNotChecked = !event.target.style.background;
    let isItem = event.target.classList.contains('time-grid_item');
    if (event.which === 1 && isNotChecked && isItem) {
      this.render.setStyle(event.target, 'background', '#CADDC0');
      this.isMouseDown = true;
    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('mouseover', ['$event.target']) onMouseEnter(
    event: HTMLElement
  ) {
    let isItem = event.classList.contains('time-grid_item');
    if (isItem) {
      this.isMouseDown
        ? this.render.setStyle(event, 'background', '#CADDC0')
        : null;
    }
  }

  @HostListener('contextmenu', ['$event']) onRightClick(event: Event) {
    event.preventDefault();
    this.render.setStyle(event.target, 'background', '');
  }

  ngOnInit(): void {
    this.today === this.day
      ? this.render.setStyle(this.el.nativeElement, 'background', '#faecc0')
      : null;
  }
}
