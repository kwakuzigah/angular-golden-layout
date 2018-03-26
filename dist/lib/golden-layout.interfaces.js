import { InjectionToken } from '@angular/core';
export var GOLDEN_LAYOUT_CONFIG = new InjectionToken('GOLDEN_LAYOUT_CONFIG');
export var GoldenLayoutEvents = [
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
var GoldenLayoutConfig = (function () {
    function GoldenLayoutConfig(config) {
        if (config === void 0) { config = {}; }
        this.assign(config);
    }
    GoldenLayoutConfig.prototype.assign = function (config, target) {
        if (config === void 0) { config = {}; }
        target = target || this;
        for (var key in config) {
            if (config[key] != null && !(Array.isArray(config[key])) &&
                typeof config[key] === 'object' && !(config[key] instanceof HTMLElement)) {
                target[key] = {};
                this.assign(config[key], target[key]);
            }
            else {
                target[key] = config[key];
            }
        }
    };
    return GoldenLayoutConfig;
}());
export { GoldenLayoutConfig };
var GoldenLayoutComponentConfig = (function () {
    function GoldenLayoutComponentConfig(config) {
        this.assign(config);
    }
    GoldenLayoutComponentConfig.prototype.assign = function (config, target) {
        if (config === void 0) { config = {}; }
        target = target || this;
        for (var key in config) {
            if (config[key] != null && !(Array.isArray(config[key])) &&
                typeof config[key] === 'object' && !(config[key] instanceof HTMLElement)) {
                target[key] = {};
                this.assign(config[key], target[key]);
            }
            else {
                target[key] = config[key];
            }
        }
    };
    return GoldenLayoutComponentConfig;
}());
export { GoldenLayoutComponentConfig };
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