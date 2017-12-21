import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoldenLayoutConfig, GOLDEN_LAYOUT_CONFIG } from 'app/golden-layout.interfaces';
import { GoldenLayoutModule } from 'app/golden-layout.module';
import * as GoldenLayout from 'golden-layout';
import { TestEditorComponent } from 'app/test-editor.component';


const DEFAULT_GOLDEN_LAYOUT_CONFIG: GoldenLayout.Config = {};

@NgModule({
  declarations: [
    AppComponent,
    TestEditorComponent
  ],
  imports: [
    GoldenLayoutModule,    
    BrowserModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: GOLDEN_LAYOUT_CONFIG,
      useValue: DEFAULT_GOLDEN_LAYOUT_CONFIG
    }
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
