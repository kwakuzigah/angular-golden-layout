import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoldenLayoutConfig, GoldenLayoutComponentDefinition } from 'app/golden-layout.interfaces';
import { GoldenLayoutComponent } from 'app/golden-layout.component';
import { GoldenLayoutDirective } from 'app/golden-layout.directive';
import * as GoldenLayout from 'golden-layout';
import { TestEditorComponent } from 'app/test-editor.component';
import { HeroJobAdComponent } from './ad.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent implements AfterViewInit {

  public type: string = 'component';
  private state: object = { label: 'COCO' };
  title = 'app';

  private config: GoldenLayout.Config = {
      settings:{
        hasHeaders: false,
        constrainDragToContainer: true,
        reorderEnabled: true
      },
      dimensions: {
          borderWidth: 1
      }
    };

private content: GoldenLayout.ItemConfigType[] = [{
    type: 'column',
    content:[{
        type:'component',
        componentName: 'test-component',
        componentState: { label: 'B' }
    },{
        type:'component',
        componentName: 'test-component',
        componentState: this.state
    }]
}];

private componentDefinitions: GoldenLayoutComponentDefinition[] = [{
    componentName: 'test-component', 
    componentType: HeroJobAdComponent
}];

//   @ViewChild(GoldenLayoutComponent) componentRef: GoldenLayoutComponent;
  @ViewChild(GoldenLayoutDirective) directiveRef: GoldenLayoutDirective;

  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }
  ngAfterViewInit(): void {
  }
}
