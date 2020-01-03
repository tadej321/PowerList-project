import {Directive, ElementRef, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

@Directive ({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  mouseup = new EventEmitter<MouseEvent>();
  mousedown = new EventEmitter<MouseEvent>();
  mousemove = new EventEmitter<MouseEvent>();

  mousedrag: Observable<{top, left}>;

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.mouseup.emit(event);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.mousedown.emit(event);
    return false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.mousemove.emit(event);
  }

  constructor(public elRef: ElementRef) {
    this.elRef.nativeElement.style.position = 'relative';
    this.elRef.nativeElement.style.cursor = 'pointer';

    this.mousedrag = this.mousedown.pipe(map(event => {
      return {
        top: event.clientY - this.elRef.nativeElement.getBoundingClientRect().top,
        left: event.clientX - this.elRef.nativeElement.getBoundingClientRect().left
      };
    }))
      // .pipe(mergeMap(
      //   imageOffset => this.mousemove.pipe(map(pos => ({
      //     top: pos.clientY - imageOffset.top,
      //     left: pos.clientX - imageOffset.left,
      //   })))
          .pipe(takeUntil(this.mouseup));
      // ));
  }
  ngOnInit() {
    this.mousedrag.subscribe({
      next: pos => {
        this.elRef.nativeElement.style.top = pos.top + 'px';
        this.elRef.nativeElement.style.left = pos.left + 'px';
      }
    });
  }

}
