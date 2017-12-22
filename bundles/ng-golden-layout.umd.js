(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('golden-layout'), require('jquery'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'golden-layout', 'jquery', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['angular-golden-layout'] = {}),global.ng.core,global.GoldenLayout,global.$,global.ng.common));
}(this, (function (exports,core,GoldenLayout,$,common) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const GOLDEN_LAYOUT_CONFIG = new core.InjectionToken('GOLDEN_LAYOUT_CONFIG');
const GoldenLayoutEvents = [
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
/**
 * @record
 */


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
const GoldenLayoutContainer = new core.InjectionToken('GoldenLayoutContainer');
const GoldenLayoutComponentState = new core.InjectionToken('GoldenLayoutComponentState');
const COMPONENT_REF_KEY = '$componentRef';
class GoldenLayoutDirective {
    /**
     * @param {?} resolver
     * @param {?} zone
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} differs
     * @param {?} viewContainer
     * @param {?} injector
     * @param {?} defaults
     */
    constructor(resolver, zone, renderer, elementRef, differs, viewContainer, injector, defaults) {
        this.resolver = resolver;
        this.zone = zone;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.differs = differs;
        this.viewContainer = viewContainer;
        this.injector = injector;
        this.defaults = defaults;
        this.disabled = false;
        this.contentChange = new core.EventEmitter();
        this.DZ_INITIALISED = new core.EventEmitter();
        this.DZ_STATECHANGED = new core.EventEmitter();
        this.DZ_WINDOWOPENED = new core.EventEmitter();
        this.DZ_WINDOWCLOSED = new core.EventEmitter();
        this.DZ_SELECTIONCHANGED = new core.EventEmitter();
        this.DZ_ITEMDESTROYED = new core.EventEmitter();
        this.DZ_ITEMCREATED = new core.EventEmitter();
        this.DZ_COMPONENTCREATED = new core.EventEmitter();
        this.DZ_ROWCREATED = new core.EventEmitter();
        this.DZ_COLUMNCREATED = new core.EventEmitter();
        this.DZ_STACKCREATED = new core.EventEmitter();
        this.DZ_TABCREATED = new core.EventEmitter();
        
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ params = new GoldenLayoutConfig(this.defaults);
        params.assign(this.config);
        params.assign({ content: this.content });
        this.zone.runOutsideAngular(() => {
            this.instance = new GoldenLayout(params, this.elementRef.nativeElement);
            this.instance.eventHub.on('stateChanged', () => {
                this.content = this.instance.toConfig().content;
            });
            this.instance.eventHub.on('itemDestroyed', (item) => {
                const /** @type {?} */ container = item.container;
                const /** @type {?} */ component = container && container[COMPONENT_REF_KEY];
                if (component) {
                    component.destroy();
                    (/** @type {?} */ (container))[COMPONENT_REF_KEY] = null;
                }
            });
        });
        // Add native Golden Layout event handling
        GoldenLayoutEvents.forEach((eventName) => {
            this.instance.on(eventName.toLowerCase(), (...args) => {
                args = (args.length === 1) ? args[0] : args;
                if (this[`DZ_${eventName.toUpperCase()}`]) {
                    this.zone.run(() => {
                        this[`DZ_${eventName.toUpperCase()}`].emit(args);
                    });
                }
            });
        });
        if (!this.configDiff) {
            this.configDiff = this.differs.find(this.config || {}).create();
            this.configDiff.diff(this.config || {});
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.init();
        this.componentDefinitions.forEach(componentDefinition => {
            this.registerComponent(componentDefinition);
        });
    }
    /**
     * @return {?}
     */
    init() {
        //init golden layout
        this.zone.runOutsideAngular(() => {
            this.instance.init();
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set content(val) {
        this._content = val;
        this.contentChange.emit(this._content);
    }
    /**
     * @return {?}
     */
    get content() {
        return this._content;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        if (this.instance) {
            this.instance.updateSize();
        }
    }
    /**
     * @param {?} goldenLayoutComponentDefinitions
     * @return {?}
     */
    registerComponent(goldenLayoutComponentDefinitions) {
        this.instance.registerComponent(goldenLayoutComponentDefinitions.componentName, (container, componentState) => {
            this.zone.run(() => {
                // Inputs need to be in the following format to be resolved properly
                // let inputProviders = Object.keys(componentState).map((inputName) => {return {provide: inputName, useValue: componentState[inputName]};});
                // inputProviders.push({
                //     provide: GoldenLayoutContainer,
                //     useValue: container
                //   });
                // console.log('inputProviders', inputProviders)
                const /** @type {?} */ injector = this._createComponentInjector(container, componentState);
                const /** @type {?} */ factory = this.resolver.resolveComponentFactory(goldenLayoutComponentDefinitions.componentType);
                const /** @type {?} */ componentRef = this.viewContainer.createComponent(factory, undefined, injector);
                // (componentRef.instance).data = componentState;
                console.log('componentState', componentState);
                // Bind the new component to container's client DOM element.
                container.getElement().append($(componentRef.location.nativeElement));
                // this._bindEventHooks(container, componentRef.instance);
                // Store a ref to the componentRef in the container to support destruction later on.
                (/** @type {?} */ (container))[COMPONENT_REF_KEY] = componentRef;
                // // We create an injector out of the data we want to pass down and this components injector
                // // let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, container.parentInjector);
                // // We create a factory out of the component we want to create
                // let factory = this.resolver.resolveComponentFactory(componentClass);
                // // We create the component using the factory and the injector
                // let component = factory.create(injector);
                // // We insert the component into the dom container
                // console.log('>>>> created component', component)
                // container.insert(component.hostView);
            });
        });
    }
    /**
     * @param {?} container
     * @param {?} componentState
     * @return {?}
     */
    _createComponentInjector(container, componentState) {
        return core.ReflectiveInjector.resolveAndCreate([
            {
                provide: GoldenLayoutContainer,
                useValue: container
            },
            {
                provide: GoldenLayoutComponentState,
                useValue: componentState
            },
        ], this.injector);
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
            this.zone.runOutsideAngular(() => {
                this.instance.destroy();
            });
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
                    this.zone.runOutsideAngular(() => {
                        this.instance.enable();
                    });
                }
                else if (changes['disabled'].currentValue === true) {
                    this.zone.runOutsideAngular(() => {
                        this.instance.disable();
                    });
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
/** @nocollapse */
GoldenLayoutDirective.ctorParameters = () => [
    { type: core.ComponentFactoryResolver, },
    { type: core.NgZone, },
    { type: core.Renderer2, },
    { type: core.ElementRef, },
    { type: core.KeyValueDiffers, },
    { type: core.ViewContainerRef, },
    { type: core.Injector, },
    { type: GoldenLayoutConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [GOLDEN_LAYOUT_CONFIG,] },] },
];
GoldenLayoutDirective.propDecorators = {
    "el": [{ type: core.ViewChild, args: ['glroot',] },],
    "disabled": [{ type: core.Input },],
    "config": [{ type: core.Input, args: ['golden-layout',] },],
    "contentChange": [{ type: core.Output },],
    "componentDefinitions": [{ type: core.Input },],
    "DZ_INITIALISED": [{ type: core.Output, args: ['initialised',] },],
    "DZ_STATECHANGED": [{ type: core.Output, args: ['stateChanged',] },],
    "DZ_WINDOWOPENED": [{ type: core.Output, args: ['windowOpened',] },],
    "DZ_WINDOWCLOSED": [{ type: core.Output, args: ['windowClosed',] },],
    "DZ_SELECTIONCHANGED": [{ type: core.Output, args: ['selectionChanged',] },],
    "DZ_ITEMDESTROYED": [{ type: core.Output, args: ['itemDestroyed',] },],
    "DZ_ITEMCREATED": [{ type: core.Output, args: ['itemCreated',] },],
    "DZ_COMPONENTCREATED": [{ type: core.Output, args: ['componentCreated',] },],
    "DZ_ROWCREATED": [{ type: core.Output, args: ['rowCreated',] },],
    "DZ_COLUMNCREATED": [{ type: core.Output, args: ['columnCreated',] },],
    "DZ_STACKCREATED": [{ type: core.Output, args: ['stackCreated',] },],
    "DZ_TABCREATED": [{ type: core.Output, args: ['tabCreated',] },],
    "content": [{ type: core.Input },],
    "onResize": [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

exports.GoldenLayoutComponent = GoldenLayoutComponent;
exports.GoldenLayoutDirective = GoldenLayoutDirective;
exports.GOLDEN_LAYOUT_CONFIG = GOLDEN_LAYOUT_CONFIG;
exports.GoldenLayoutConfig = GoldenLayoutConfig;
exports.GoldenLayoutModule = GoldenLayoutModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-golden-layout.umd.js.map
