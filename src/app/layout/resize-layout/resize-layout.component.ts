import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resize-layout',
  templateUrl: './resize-layout.component.html',
  styleUrls: ['./resize-layout.component.scss']
})
export class ResizeLayoutComponent implements OnInit {

  @Input() direction: string= '';
  constructor(
    public readonly elRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

}
