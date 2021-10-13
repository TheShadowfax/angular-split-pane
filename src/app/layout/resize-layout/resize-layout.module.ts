import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeLayoutDirective } from './resize-layout.directive';
import { ResizeLayoutComponent } from './resize-layout.component';


@NgModule({
  declarations: [
    ResizeLayoutDirective,
    ResizeLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ResizeLayoutDirective
  ]
})
export class ResizeLayoutModule { }
