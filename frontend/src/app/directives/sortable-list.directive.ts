import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  HostListener,
  Output,
  QueryList
} from "@angular/core";
import {SortableDirective} from "./sortable.directive";
import {DraggableHelperDirective} from "./draggable-helper.directive";

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  );
};

@Directive({
  selector: '[appSortableList]'
})

export class SortableListDirective implements AfterContentInit {

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;
  @ContentChildren(DraggableHelperDirective) draggableHelpers: QueryList<DraggableHelperDirective>;

  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];

  constructor() {

  }

  ngAfterContentInit(): void {
    this.sortables.forEach((sortable, index) => {
      // const draggableHelper = this.draggableHelpers._results
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe((event) => this.detectSorting(sortable, event, index));
    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: SortableDirective, event: any, index: number) {
    const asd = this.draggableHelpers.toArray();
    console.log(asd[index].helperMove);
    // const currentIndex = this.sortables.toArray().indexOf(sortable);
    //
    // // prevRect is undefined if we are dragging the first element
    // const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
    // // nextRect is undefined if we are dragging the last element
    // const nextRect = this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] : undefined;
    //
    // if (prevRect && event.clientY < prevRect.top + prevRect.height / 2) {
    //   this.sort.emit({
    //     currentIndex,
    //     newIndex: currentIndex - 1
    //   });
    // } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
    //   this.sort.emit({
    //     currentIndex,
    //     newIndex: currentIndex + 1
    //   });
    // }

    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      // Sort by distance to current rect
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .forEach(rect => {
        // find first rect that we need to swap with
        if (rect === currentRect) {
          return false;
        }

        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

        let moveBack = false;
        let moveForward = false;

        if (isHorizontal) {
          moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
          moveForward = !isBefore && event.clientX > rect.left + rect.width / 2;
        } else {
          moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
          moveForward = !isBefore && event.clientY > rect.top + 8;
        }

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });
          return true;
        }

        return false;
      });
  }
}
