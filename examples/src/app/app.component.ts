import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoldenLayoutConfig } from 'app/golden-layout.interfaces';
import { GoldenLayoutComponent } from 'app/golden-layout.component';
import { GoldenLayoutDirective } from 'app/golden-layout.directive';
import * as GoldenLayout from 'golden-layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent implements AfterViewInit {

  public type: string = 'component';
  title = 'app';

  public config: GoldenLayout.Config = {
      settings:{
        hasHeaders: false,
        constrainDragToContainer: true,
        reorderEnabled: true
      },
      dimensions: {
          borderWidth: 1
      },
      content: [{
          type: 'column',
          content:[{
              type:'component',
              componentName: 'test-component',
              componentState: { label: 'B' }
          },{
              type:'component',
              componentName: 'test-component',
              componentState: { label: 'C' }
          }]
      }]
    };

//   @ViewChild(GoldenLayoutComponent) componentRef: GoldenLayoutComponent;
  @ViewChild(GoldenLayoutDirective) directiveRef: GoldenLayoutDirective;

  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }
  ngAfterViewInit(): void {
      this.directiveRef.registerComponent('test-component', TestEditorComponent);
      this.directiveRef.init();
  }
}
