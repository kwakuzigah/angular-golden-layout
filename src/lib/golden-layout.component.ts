import { Component, ViewEncapsulation,
    Input, Output, ViewChild, EventEmitter } from '@angular/core';
  
import { GoldenLayoutDirective } from './golden-layout.directive';
import { GoldenLayoutConfig } from './golden-layout.interfaces';
  
  @Component({
    selector: 'golden-layout',
    exportAs: 'angularGoldenLayout',
    template: '<div></div>',
    // styleUrls: [ './lib/golden-layout.component.css' ],
  })
  export class GoldenLayoutComponent {
    @Input() disabled: boolean = false;
  
    @Input() config: GoldenLayoutConfig;
  
    @Input() useGoldenLayoutClass: boolean = true;
  
    @ViewChild(GoldenLayoutDirective) directiveRef: GoldenLayoutDirective;
  
  
    constructor() {}
  }