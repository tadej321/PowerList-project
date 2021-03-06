import {Directive, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {DraggableDirective} from "./draggable.directive";
import {GlobalPositionStrategy, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Directive({
  selector: '[appDraggableHelper]',
  exportAs: 'appDraggableHelperDirective'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: { x: number; y: number };

  constructor(private draggable: DraggableDirective,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private overlay: Overlay) { }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe(event => this.onDragStart(event));
    this.draggable.dragMove.subscribe(event => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());

    // create an overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    // remove overlay
    this.overlayRef.dispose();
  }

  onDragStart(event: PointerEvent): void {
    // determine relative start position
    const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    };
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      // render the helper from the overlay
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }
    // position the helper
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  onDragEnd(): void {
    // remove the helper from the overlay
    this.overlayRef.detach();
  }
}
