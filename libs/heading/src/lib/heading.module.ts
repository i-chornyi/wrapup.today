import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { H1Component } from './h1/h1.component';
import { H2Component } from './h2/h2.component';
import { H3Component } from './h3/h3.component';
import { H4Component } from './h4/h4.component';
import { H5Component } from './h5/h5.component';
import { H6Component } from './h6/h6.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    H1Component,
    H2Component,
    H3Component,
    H4Component,
    H5Component,
    H6Component,
  ],
  exports: [
    H1Component,
    H2Component,
    H3Component,
    H4Component,
    H5Component,
    H6Component,
  ],
})
export class HeadingModule {}
