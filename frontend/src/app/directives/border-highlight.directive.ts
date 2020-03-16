import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBorderHighlight]'
})
export class BorderHighlightDirective implements OnInit {
  @HostBinding('style.box-shadow') shadow = '10px 10px 8px #A9A9A9';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'border', '1px solid #0000FF'); // use this method if not using @HostBinding
    this.shadow = '10px 10px 8px 6px #888888';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'border', 'none');
    this.shadow = '10px 10px 8px #A9A9A9';
  }

  // @HostListener('dragStart') onDragStart() {
  //   this.border = '1px solid #ff0000';
  // }
  // @HostListener('dragMove') onDragMove() {
  //   this.border = '1px solid #ff0000';
  // }
  // @HostListener('dragEnd') onDragStop() {
  //   this.border = '1px solid #D3D3D3';
  // }
}
