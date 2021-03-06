
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { GoldenLayoutComponent } from './golden-layout.component';
import { GoldenLayoutDirective } from './golden-layout.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [GoldenLayoutComponent, GoldenLayoutDirective],
  exports: [CommonModule, GoldenLayoutComponent, GoldenLayoutDirective]
})
export class GoldenLayoutModule {
}