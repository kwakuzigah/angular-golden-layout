/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from "@angular/core";
export const /** @type {?} */ GOLDEN_LAYOUT_CONFIG = new InjectionToken('GOLDEN_LAYOUT_CONFIG');
export const /** @type {?} */ GoldenLayoutEvents = [
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
/**
 * @record
 */
export function GoldenLayoutComponentDefinition() { }
function GoldenLayoutComponentDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    GoldenLayoutComponentDefinition.prototype.componentName;
    /** @type {?} */
    GoldenLayoutComponentDefinition.prototype.componentType;
}
export class GoldenLayoutConfig {
    /**
     * @param {?=} config
     */
    constructor(config = {}) {
        this.assign(config);
    }
    /**
     * @param {?=} config
     * @param {?=} target
     * @return {?}
     */
    assign(config = {}, target) {
        target = target || this;
        for (const /** @type {?} */ key in config) {
            if (config[key] != null && !(Array.isArray(config[key])) &&
                typeof config[key] === 'object' && !(config[key] instanceof HTMLElement)) {
                target[key] = {};
                this.assign(config[key], target[key]);
            }
            else {
                target[key] = config[key];
            }
        }
    }
}
function GoldenLayoutConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    GoldenLayoutConfig.prototype.settings;
    /** @type {?} */
    GoldenLayoutConfig.prototype.dimensions;
    /** @type {?} */
    GoldenLayoutConfig.prototype.labels;
    /** @type {?} */
    GoldenLayoutConfig.prototype.content;
}
/**
 * @record
 */
export function GoldenLayoutContentComponentInterface() { }
function GoldenLayoutContentComponentInterface_tsickle_Closure_declarations() {
    /** @type {?} */
    GoldenLayoutContentComponentInterface.prototype.state;
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
//# sourceMappingURL=golden-layout.interfaces.js.map