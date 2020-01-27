import {AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList} from "@angular/core";
import {SortableDirective} from "./sortable.directive";

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

@Directive({
  selector: '[appSortableList]'
})

export class SortableListDirective implements AfterContentInit {

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];

  ngAfterContentInit(): void {
    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: SortableDirective, event: any) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);

    // prevRect is undefined if we are dragging the first element
    const prevRect = currentIndex > 0 ? this.clientRects[currentIndex - 1] : undefined;
    // nextRect is undefined if we are dragging the last element
    const nextRect = this.clientRects.length - 1 ? this.clientRects[currentIndex + 1] : undefined;

    if (prevRect && event.clientY < prevRect.top + prevRect.height / 2) {
      this.sort.emit({
        currentIndex,
        newIndex: currentIndex - 1
      });
    } else if (nextRect && event.clientY > nextRect.top + nextRect.height / 2) {
      this.sort.emit({
        currentIndex,
        newIndex: currentIndex + 1
      });
    }
  }
}
