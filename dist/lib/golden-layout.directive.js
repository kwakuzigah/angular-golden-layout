/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as GoldenLayout from "golden-layout";
import $ from "jquery";
import { InjectionToken, HostListener, Directive, Input, Renderer2, KeyValueDiffers, ElementRef, ViewContainerRef, Injector, Optional, ViewChild, Inject, NgZone, ReflectiveInjector, ComponentFactoryResolver, EventEmitter, Output } from "@angular/core";
import { GOLDEN_LAYOUT_CONFIG } from "./golden-layout.interfaces";
import { GoldenLayoutEvents, GoldenLayoutConfig } from "./golden-layout.interfaces";
export const /** @type {?} */ GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
export const /** @type {?} */ GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
const /** @type {?} */ COMPONENT_REF_KEY = '$componentRef';
export class GoldenLayoutDirective {
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
        this.contentChange = new EventEmitter();
        this.DZ_INITIALISED = new EventEmitter();
        this.DZ_STATECHANGED = new EventEmitter();
        this.DZ_WINDOWOPENED = new EventEmitter();
        this.DZ_WINDOWCLOSED = new EventEmitter();
        this.DZ_SELECTIONCHANGED = new EventEmitter();
        this.DZ_ITEMDESTROYED = new EventEmitter();
        this.DZ_ITEMCREATED = new EventEmitter();
        this.DZ_COMPONENTCREATED = new EventEmitter();
        this.DZ_ROWCREATED = new EventEmitter();
        this.DZ_COLUMNCREATED = new EventEmitter();
        this.DZ_STACKCREATED = new EventEmitter();
        this.DZ_TABCREATED = new EventEmitter();
        const /** @type {?} */ gl = GoldenLayout;
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
        return ReflectiveInjector.resolveAndCreate([
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
    { type: Directive, args: [{
                selector: '[golden-layout]',
                exportAs: 'angularGoldenLayout'
            },] },
];
/** @nocollapse */
GoldenLayoutDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: NgZone, },
    { type: Renderer2, },
    { type: ElementRef, },
    { type: KeyValueDiffers, },
    { type: ViewContainerRef, },
    { type: Injector, },
    { type: GoldenLayoutConfig, decorators: [{ type: Optional }, { type: Inject, args: [GOLDEN_LAYOUT_CONFIG,] },] },
];
GoldenLayoutDirective.propDecorators = {
    "el": [{ type: ViewChild, args: ['glroot',] },],
    "disabled": [{ type: Input },],
    "config": [{ type: Input, args: ['golden-layout',] },],
    "contentChange": [{ type: Output },],
    "componentDefinitions": [{ type: Input },],
    "DZ_INITIALISED": [{ type: Output, args: ['initialised',] },],
    "DZ_STATECHANGED": [{ type: Output, args: ['stateChanged',] },],
    "DZ_WINDOWOPENED": [{ type: Output, args: ['windowOpened',] },],
    "DZ_WINDOWCLOSED": [{ type: Output, args: ['windowClosed',] },],
    "DZ_SELECTIONCHANGED": [{ type: Output, args: ['selectionChanged',] },],
    "DZ_ITEMDESTROYED": [{ type: Output, args: ['itemDestroyed',] },],
    "DZ_ITEMCREATED": [{ type: Output, args: ['itemCreated',] },],
    "DZ_COMPONENTCREATED": [{ type: Output, args: ['componentCreated',] },],
    "DZ_ROWCREATED": [{ type: Output, args: ['rowCreated',] },],
    "DZ_COLUMNCREATED": [{ type: Output, args: ['columnCreated',] },],
    "DZ_STACKCREATED": [{ type: Output, args: ['stackCreated',] },],
    "DZ_TABCREATED": [{ type: Output, args: ['tabCreated',] },],
    "content": [{ type: Input },],
    "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};
function GoldenLayoutDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GoldenLayoutDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GoldenLayoutDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    GoldenLayoutDirective.propDecorators;
    /** @type {?} */
    GoldenLayoutDirective.prototype.instance;
    /** @type {?} */
    GoldenLayoutDirective.prototype.configDiff;
    /** @type {?} */
    GoldenLayoutDirective.prototype.el;
    /** @type {?} */
    GoldenLayoutDirective.prototype.disabled;
    /** @type {?} */
    GoldenLayoutDirective.prototype.config;
    /** @type {?} */
    GoldenLayoutDirective.prototype._content;
    /** @type {?} */
    GoldenLayoutDirective.prototype.contentChange;
    /** @type {?} */
    GoldenLayoutDirective.prototype.componentDefinitions;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_INITIALISED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_STATECHANGED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_WINDOWOPENED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_WINDOWCLOSED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_SELECTIONCHANGED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_ITEMDESTROYED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_ITEMCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_COMPONENTCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_ROWCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_COLUMNCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_STACKCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.DZ_TABCREATED;
    /** @type {?} */
    GoldenLayoutDirective.prototype.resolver;
    /** @type {?} */
    GoldenLayoutDirective.prototype.zone;
    /** @type {?} */
    GoldenLayoutDirective.prototype.renderer;
    /** @type {?} */
    GoldenLayoutDirective.prototype.elementRef;
    /** @type {?} */
    GoldenLayoutDirective.prototype.differs;
    /** @type {?} */
    GoldenLayoutDirective.prototype.viewContainer;
    /** @type {?} */
    GoldenLayoutDirective.prototype.injector;
    /** @type {?} */
    GoldenLayoutDirective.prototype.defaults;
}
//# sourceMappingURL=golden-layout.directive.js.map