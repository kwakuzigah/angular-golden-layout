import { Component, Input, Inject } from '@angular/core';


import { GoldenLayoutComponentState } from './golden-layout.directive';
import { GoldenLayoutContentComponentInterface }      from './golden-layout.interfaces';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{state.label}}</h4> 
      <input type="text" [(ngModel)]="state.label" >
      test
    </div>
  `
})
export class HeroJobAdComponent implements GoldenLayoutContentComponentInterface {
  @Input() data: any;

  // @Input('label')
  // private test: string;

  constructor (@Inject(GoldenLayoutComponentState) private state: GoldenLayoutComponentState) {

  }
  private onChangeCallback: (_: any) => void = noop;
}
