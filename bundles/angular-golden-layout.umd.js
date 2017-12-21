(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('golden-layout'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'golden-layout', '@angular/common'], factory) :
	(factory((global.zef = global.zef || {}, global.zef.angularGoldenLayout = {}),global.ng.core,global.GoldenLayout,global.ng.common));
}(this, (function (exports,core,GoldenLayout,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const GOLDEN_LAYOUT_CONFIG = new core.InjectionToken('GOLDEN_LAYOUT_CONFIG');

class GoldenLayoutConfig {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GoldenLayoutDirective {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} differs
     * @param {?} defaults
     */
    constructor(renderer, elementRef, differs, defaults) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.differs = differs;
        this.defaults = defaults;
        this.disabled = false;
        
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ params = new GoldenLayoutConfig(this.defaults);
        params.assign(this.config); // Custom configuration
        //     this.renderer.addClass(this.elementRef.nativeElement,
        //       (params.maxFiles === 1) ? 'dz-single' : 'dz-multiple');
        //     this.renderer.removeClass(this.elementRef.nativeElement,
        //       (params.maxFiles === 1) ? 'dz-multiple' : 'dz-single');
        // this.zone.runOutsideAngular(() => {
        this.instance = new GoldenLayout(params, this.elementRef.nativeElement);
        // });
        //     // Add auto reset handling for events
        //     this.instance.on('success', (result) => {
        //       if (params.autoReset != null) {
        //         setTimeout(() => this.reset(), params.autoReset);
        //       }
        //     });
        //     this.instance.on('error', (error) => {
        //       if (params.errorReset != null) {
        //         setTimeout(() => this.reset(), params.errorReset);
        //       }
        //     });
        //     this.instance.on('canceled', (result) => {
        //       if (params.cancelReset != null) {
        //         setTimeout(() => this.reset(), params.cancelReset);
        //       }
        //     });
        //     // Add native Dropzone event handling
        //     DropzoneEvents.forEach((eventName) => {
        //       this.instance.on(eventName.toLowerCase(), (...args) => {
        //         args = (args.length === 1) ? args[0] : args;
        //         if (this[`DZ_${eventName.toUpperCase()}`]) {
        //           this.zone.run(() => {
        //             this[`DZ_${eventName.toUpperCase()}`].emit(args);
        //           });
        //         }
        //       });
        //     });
        if (!this.configDiff) {
            this.configDiff = this.differs.find(this.config || {}).create();
            this.configDiff.diff(this.config || {});
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.disabled && this.configDiff) {
            const /** @type {?} */ changes = this.configDiff.diff(this.config || {});
            if (changes && this.instance) {
                this.ngOnDestroy();
                this.ngOnInit();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.instance) {
            // this.zone.runOutsideAngular(() => {
            this.instance.destroy();
            // });
            this.instance = null;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.instance && changes['disabled']) {
            if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                if (changes['disabled'].currentValue === false) {
                    // this.zone.runOutsideAngular(() => {
                    this.instance.enable();
                    // });
                }
                else if (changes['disabled'].currentValue === true) {
                    // this.zone.runOutsideAngular(() => {
                    this.instance.disable();
                    // });
                }
            }
        }
    }
    /**
     * @return {?}
     */
    goldenLayout() {
        return this.instance;
    }
}
GoldenLayoutDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[golden-layout]',
                exportAs: 'angularGoldenLayout'
            },] },
];
// public reset(cancel?: boolean) {
//     if (this.instance) {
//       this.zone.runOutsideAngular(() => {
//         this.instance.removeAllFiles(cancel);
//       });
//     }
//   }
/** @nocollapse */
GoldenLayoutDirective.ctorParameters = () => [
    { type: core.Renderer2, },
    { type: core.ElementRef, },
    { type: core.KeyValueDiffers, },
    { type: GoldenLayoutConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [GOLDEN_LAYOUT_CONFIG,] },] },
];
GoldenLayoutDirective.propDecorators = {
    "disabled": [{ type: core.Input },],
    "config": [{ type: core.Input, args: ['golden-layout',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GoldenLayoutComponent {
    constructor() {
        this.disabled = false;
        this.useGoldenLayoutClass = true;
    }
}
GoldenLayoutComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'golden-layout',
                exportAs: 'angularGoldenLayout',
                template: '<div></div>',
                styles: [''],
            },] },
];
/** @nocollapse */
GoldenLayoutComponent.ctorParameters = () => [];
GoldenLayoutComponent.propDecorators = {
    "disabled": [{ type: core.Input },],
    "config": [{ type: core.Input },],
    "useGoldenLayoutClass": [{ type: core.Input },],
    "directiveRef": [{ type: core.ViewChild, args: [GoldenLayoutDirective,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GoldenLayoutModule {
}
GoldenLayoutModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [GoldenLayoutComponent, GoldenLayoutDirective],
                exports: [common.CommonModule, GoldenLayoutComponent, GoldenLayoutDirective]
            },] },
];
/** @nocollapse */
GoldenLayoutModule.ctorParameters = () => [];

exports.GoldenLayoutComponent = GoldenLayoutComponent;
exports.GoldenLayoutDirective = GoldenLayoutDirective;
exports.GOLDEN_LAYOUT_CONFIG = GOLDEN_LAYOUT_CONFIG;
exports.GoldenLayoutConfig = GoldenLayoutConfig;
exports.GoldenLayoutModule = GoldenLayoutModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-golden-layout.umd.js.map
