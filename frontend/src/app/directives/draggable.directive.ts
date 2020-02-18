import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';


@Directive ({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  constructor(public element: ElementRef) {

  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    console.log(event.clientY);
    this.dragging = true;
    event.stopPropagation();
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }


  // @HostBinding('class.draggable') draggable = true;
  //
  // @Output() dragStart = new EventEmitter<PointerEvent>();
  // @Output() dragMove = new EventEmitter<PointerEvent>();
  // @Output() dragEnd = new EventEmitter<PointerEvent>();
  //
  // pointerDown = new Subject<PointerEvent>();
  // private pointerMove = new Subject<PointerEvent>();
  // private pointerUp = new Subject<PointerEvent>();
  //
  // @HostListener('pointerdown', ['$event'])
  // onPointerDown(event: PointerEvent): void {
  //   this.pointerDown.next(event);
  // }
  //
  // @HostListener('document:pointermove', ['$event'])
  // onPointerMove(event: PointerEvent): void {
  //   this.pointerMove.next(event);
  // }
  //
  // @HostListener('document:pointerup', ['$event'])
  // onPointerUp(event: PointerEvent): void {
  //   this.pointerUp.next(event);
  // }
  //
  // ngOnInit(): void {
  //   // Start streaming dragStart
  //   this.pointerDown.asObservable().subscribe(event => this.dragStart.emit(event));
  //
  //   // Start streaming dragMove
  //   this.pointerDown.pipe(
  //     switchMap(() => this.pointerMove.pipe(takeUntil(this.pointerUp))),
  //   ).subscribe(event => this.dragMove.emit(event));
  //
  //   // Start streaming dragEnd
  //   this.pointerDown.pipe(
  //     switchMap(() => this.pointerUp.pipe(take(1)))
  //   ).subscribe(event => this.dragEnd.emit(event));
  // }
}
