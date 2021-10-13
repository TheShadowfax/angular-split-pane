import { ComponentFactoryResolver, Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ResizeLayoutComponent } from './resize-layout.component';

@Directive({
  selector: '[resizeLayout]',

})
export class ResizeLayoutDirective implements OnInit {

  @Input('flow') direction: string = 'row';
  private x: any;
  private y: any;
  private previousSiblingWidth: any;
  private currenMouseDown: any = null;
  private previousSiblingHeight: any = null;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly render: Renderer2,
    private cfResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,

  ) { }

  ngOnInit(): void {
    let css = `
    display: flex;
    flex-direction: ${this.direction === 'row' ? 'row' : 'column'}
    `;

    this.render.setAttribute(this.elementRef.nativeElement, 'style', css);

    const childNodesLength = this.elementRef.nativeElement?.children?.length ?? 0;
    
    if (childNodesLength > 1) {
      let currentEle = this.elementRef.nativeElement.childNodes[1];
      this.createResizer(currentEle);
      for (let i = 2; i < childNodesLength; i++) {
        currentEle = this.render.nextSibling(currentEle);
        this.createResizer(currentEle);
      }
    }

  }

  createResizer(placeBefore: any) {
    const factory =
      this.cfResolver.resolveComponentFactory(ResizeLayoutComponent);
    const componentRef = this.vcRef.createComponent(factory);
    componentRef.instance.direction = this.direction;
    const divider = componentRef.injector.get(ResizeLayoutComponent).elRef.nativeElement;
    this.render.appendChild(
      this.vcRef.element.nativeElement,
      divider
    );

    this.render.insertBefore(this.elementRef.nativeElement, divider, placeBefore, true);
    fromEvent(divider, 'mousedown').subscribe((e: any) => {
      this.currenMouseDown = divider;

      const leftSide = divider.previousElementSibling;

      this.x = e.clientX;
      this.y = e.clientY;
      this.previousSiblingWidth = leftSide.getBoundingClientRect().width;
      this.previousSiblingHeight = leftSide.getBoundingClientRect().height;
    });

    fromEvent<MouseEvent>(document, 'mousemove').subscribe((e: MouseEvent) => {

      if (!this.currenMouseDown) return;
      const prevSibling = this.currenMouseDown.previousElementSibling;
      const nextSibling = this.currenMouseDown.nextElementSibling;
      const dx = e.clientX - this.x;
      const dy = e.clientY - this.y;

      switch (this.direction) {
        case 'column':
          let h = (this.previousSiblingHeight + dy) * 100 / this.currenMouseDown.parentNode.getBoundingClientRect().height;
          prevSibling.style.height = `${h}%`;
          break;
        case 'row':
        default:
          const w = (this.previousSiblingWidth + dx) * 100 / this.currenMouseDown.parentNode.getBoundingClientRect().width;
          prevSibling.style.width = `${w}%`;
          break;
      }

      const cursor = this.direction === 'row' ? 'col-resize' : 'row-resize';

      this.currenMouseDown.style.cursor = cursor;
      document.body.style.cursor = cursor;

      prevSibling.style.userSelect = 'none';
      prevSibling.style.pointerEvents = 'none';

      nextSibling.style.userSelect = 'none';
      nextSibling.style.pointerEvents = 'none';
    })

    fromEvent(divider, 'mouseup').subscribe((e: any) => {
      this.currenMouseDown = null;
      const leftSide = divider.previousElementSibling;
      const rightSide = divider.nextElementSibling;

      divider.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');

      divider.style.removeProperty('user-select');
      leftSide.style.removeProperty('pointer-events');

      rightSide.style.removeProperty('user-select');
      rightSide.style.removeProperty('pointer-events');
    })

    fromEvent(document, 'mouseup').subscribe((e: any) => {
      this.currenMouseDown = null;
    })
  }



}
