import {Directive, ElementRef, HostListener, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appBorderHighlight]'
})
export class BorderHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'border', '1px solid #0000FF');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'border', 'none');
  }
}
