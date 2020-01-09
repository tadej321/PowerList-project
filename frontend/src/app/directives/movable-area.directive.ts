import {AfterContentInit, ContentChildren, Directive, ElementRef, QueryList} from '@angular/core';
import {MovableDirective} from './movable.directive';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableAreaDirective]'
})
export class MovableAreaDirective implements AfterContentInit{
  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    this.movables.forEach(movable => {
      movable.dragStart.subscribe(() => this.measureBoundaries(movable));
      movable.dragMove.subscribe(() => this.maintainBoundaries(movable));
    });
  }

  private measureBoundaries(movable: MovableDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left,
      maxX: viewRect.right - movableClientRect.right,
      maxY: viewRect.top - movableClientRect.top,
      minY: viewRect.bottom - movableClientRect.bottom,
    };
    console.log(this.boundaries);
  }

  private maintainBoundaries(movable: MovableDirective) {
    movable.position.x = movable.position.x < this.boundaries.minX ? this.boundaries.minX : movable.position.x;
  }
}
