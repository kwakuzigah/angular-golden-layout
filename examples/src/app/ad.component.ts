import { Component, Input, Inject } from '@angular/core';
import * as GoldenLayout from 'golden-layout';

import { GoldenLayoutComponentState, GoldenLayoutContainer } from './golden-layout.directive';
import { GoldenLayoutContentComponentInterface } from './golden-layout.interfaces';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{state.label}}</h4> 
      <input type="text" [(ngModel)]="state.label" (input)="onInput($event)">
      test
    </div>
  `
})
export class HeroJobAdComponent {

  constructor (@Inject(GoldenLayoutComponentState) private state: any,
               @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container) {

  }

  public onInput(e: Event): void {
    
    this.container.extendState({
      label: (<HTMLInputElement>e.target).value
    });

    console.log('state saved.');
  }
}
