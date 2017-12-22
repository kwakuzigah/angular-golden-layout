/// <reference types="golden-layout" />
import { InjectionToken } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
export declare const GOLDEN_LAYOUT_CONFIG: InjectionToken<{}>;
export declare const GoldenLayoutEvents: string[];
export interface GoldenLayoutComponentDefinition {
    componentName: string;
    componentType: any;
}
export declare class GoldenLayoutConfig implements GoldenLayout.Config {
    settings: GoldenLayout.Settings;
    dimensions: GoldenLayout.Dimensions;
    labels: GoldenLayout.Labels;
    content: GoldenLayout.ItemConfigType[];
    constructor(config?: GoldenLayout.Config);
    assign(config?: GoldenLayout.Config | any, target?: any): void;
}
export interface GoldenLayoutContentComponentInterface {
    state: any;
}
