import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MovableDirective} from './movable.directive';
import {Subscription} from 'rxjs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {
  @ContentChildren(MovableDirective, { descendants: true }) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];
  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
  console.log(this.movables.length);
    // Subscribe to QueryList changes so that dynamically added elements implement the functionality.
  this.movables.changes.subscribe(() => {

      // Unsubscribe from the array of subscriptions so that they do not persist during the session.
      this.subscriptions.forEach(s => s.unsubscribe());

      this.movables.forEach(movable => {
        // Add the subscription to the array of subscriptions so that they can be managed.
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
      });
    });
    // Trigger the changes observable.
  this.movables.notifyOnChanges();

  }

  private measureBoundaries(movable: MovableDirective) {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y,
    };
    console.log(this.boundaries);
  }

  private maintainBoundaries(movable: MovableDirective) {
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
  }
}
