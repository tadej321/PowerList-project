import {Directive, HostBinding, HostListener} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovableDirective]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }
  @HostBinding('style.position') elementPosition;

  private position: Position = {x: 0, y: 0};

  private reset = true;

  private startPosition: Position = {x: 0, y: 0};

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.elementPosition = 'relative';
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  @HostListener('dragEnd', ['$event'])
  onDragStop(event: PointerEvent) {
      this.position = {x: 0, y: 0};
  }
}
