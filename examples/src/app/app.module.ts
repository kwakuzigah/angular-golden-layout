import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { HeroJobAdComponent } from './ad.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoldenLayoutConfig, GoldenLayoutModule, GOLDEN_LAYOUT_CONFIG } from 'angular-golden-layout';
import * as GoldenLayout from 'golden-layout';
import { TestEditorComponent } from 'app/test-editor.component';
import { FormsModule } from '@angular/forms';


const DEFAULT_GOLDEN_LAYOUT_CONFIG: GoldenLayout.Config = {};

@NgModule({
  declarations: [
    AppComponent,
    HeroJobAdComponent,
    TestEditorComponent
  ],
  entryComponents: [ HeroJobAdComponent, TestEditorComponent ],
  imports: [
    GoldenLayoutModule,    
    BrowserModule,
    FlexLayoutModule,
    FormsModule
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
