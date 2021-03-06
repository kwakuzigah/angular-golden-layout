import { InjectionToken } from '@angular/core';
import * as GoldenLayout from 'golden-layout';

export const GOLDEN_LAYOUT_CONFIG = new InjectionToken('GOLDEN_LAYOUT_CONFIG');

export const GoldenLayoutEvents = [
  'initialised',
  'stateChanged',
  'windowOpened',
  'windowClosed',
  'selectionChanged',
  'itemDestroyed',
  'itemCreated',
  'componentCreated',
  'rowCreated',
  'columnCreated',
  'stackCreated',
  'tabCreated'
];


export interface GoldenLayoutComponentDefinition {
  componentName: string;
  componentType: any;
}

export interface GoldenLayoutItemConfiguration {
  title?: string;
  componentName: string;
  componentState?: any;
}

export class GoldenLayoutConfig implements GoldenLayout.Config {
  settings: GoldenLayout.Settings;
  dimensions: GoldenLayout.Dimensions;
  labels: GoldenLayout.Labels;
  content: GoldenLayout.ItemConfigType[];

  constructor(config: GoldenLayout.Config = {}) {
    this.assign(config);
  }

  assign(config: GoldenLayout.Config | any = {}, target?: any) {
    target = target || this;

    for (const key in config) {
      if (config[key] != null && !(Array.isArray(config[key])) &&
        typeof config[key] === 'object' && !(config[key] instanceof HTMLElement))
      {
        target[key] = {};

        this.assign(config[key], target[key]);
      } else {
        target[key] = config[key];
      }
    }
  }
}

export interface GoldenLayoutContentComponentInterface {
  state: any;
}

export class GoldenLayoutComponentConfig implements GoldenLayout.ComponentConfig {
  title?: string;
  type: string;
  componentName: string;
  componentState?: any;

  constructor(config: GoldenLayout.ComponentConfig) {
    this.assign(config);
  }

  assign(config: GoldenLayout.ComponentConfig | any = {}, target?: any) {
    target = target || this;

    for (const key in config) {
      if (config[key] != null && !(Array.isArray(config[key])) &&
        typeof config[key] === 'object' && !(config[key] instanceof HTMLElement))
      {
        target[key] = {};

        this.assign(config[key], target[key]);
      } else {
        target[key] = config[key];
      }
    }
  }
}

// export type DropzoneUrlFunction = (files: any) => string;
// export type DropzoneMethodFunction = (files: any) => string;

// export type DropzoneParamsFunction = (files: any, xhr: any, chunk?: any) => any;
// export type DropzoneHeadersFunction = () => any;

// export type DropzoneInitFunction = () => any;
// export type DropzoneFallbackFunction = () => HTMLElement;

// export type DropzoneAcceptFunction = (file: File, done: Function) => any;
// export type DropzoneResizeFunction = (file: File, width: number, height: number, resizeMethod: string) => any;

// export type DropzoneRenameFileFunction = (file: File) => string;
// export type DropzoneTransformFileFunction = (file: File, done: Function) => any;
// export type DropzoneChunksUploadedFunction = (file: File, done: Function) => any;