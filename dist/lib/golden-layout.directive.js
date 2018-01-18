import * as GoldenLayout from 'golden-layout';
import { InjectionToken, Directive, Input, Renderer2, KeyValueDiffers, ElementRef, ViewContainerRef, Injector, Optional, ViewChild, Inject, NgZone, ReflectiveInjector, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { GOLDEN_LAYOUT_CONFIG } from './golden-layout.interfaces';
import { GoldenLayoutEvents, GoldenLayoutConfig } from './golden-layout.interfaces';
export var GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
export var GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
var COMPONENT_REF_KEY = '$componentRef';
var GoldenLayoutDirective = (function () {
    function GoldenLayoutDirective(resolver, zone, renderer, elementRef, differs, viewContainer, injector, defaults) {
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
        this.GL_INITIALISED = new EventEmitter();
        this.GL_STATECHANGED = new EventEmitter();
        this.GL_WINDOWOPENED = new EventEmitter();
        this.GL_WINDOWCLOSED = new EventEmitter();
        this.GL_SELECTIONCHANGED = new EventEmitter();
        this.GL_ITEMDESTROYED = new EventEmitter();
        this.GL_ITEMCREATED = new EventEmitter();
        this.GL_COMPONENTCREATED = new EventEmitter();
        this.GL_ROWCREATED = new EventEmitter();
        this.GL_COLUMNCREATED = new EventEmitter();
        this.GL_STACKCREATED = new EventEmitter();
        this.GL_TABCREATED = new EventEmitter();
        var gl = GoldenLayout;
    }
    GoldenLayoutDirective.prototype.ngOnInit = function () {
        var _this = this;
        var params = new GoldenLayoutConfig(this.defaults);
        params.assign(this.config);
        params.assign({ content: this.content });
        this.zone.runOutsideAngular(function () {
            _this.instance = new GoldenLayout(params, _this.elementRef.nativeElement);
            _this.instance.on('stateChanged', function () {
                _this.content = _this.instance.toConfig().content;
            });
            // this.instance.on('itemDestroyed', (item: any) => {
            //   const container = item.container;
            //   const component = container && container[COMPONENT_REF_KEY];
            //   if (component) {
            //     component.destroy();
            //     (container as any)[COMPONENT_REF_KEY] = null;
            //   }
            // });
            // Add native Golden Layout event handling
            GoldenLayoutEvents.forEach(function (eventName) {
                _this.instance.on(eventName.toLowerCase(), function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    args = (args.length === 1) ? args[0] : args;
                    if (_this["GL_" + eventName.toUpperCase()]) {
                        _this.zone.run(function () {
                            _this["GL_" + eventName.toUpperCase()].emit(args);
                        });
                    }
                });
            });
        });
        if (!this.configDiff) {
            this.configDiff = this.differs.find(this.config || {}).create();
            this.configDiff.diff(this.config || {});
        }
    };
    GoldenLayoutDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.componentDefinitions.forEach(function (componentDefinition) {
            _this.registerComponent(componentDefinition);
        });
        this.init();
    };
    GoldenLayoutDirective.prototype.init = function () {
        var _this = this;
        //init golden layout
        this.zone.runOutsideAngular(function () {
            _this.instance.init();
        });
    };
    Object.defineProperty(GoldenLayoutDirective.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (val) {
            this._content = val;
            this.contentChange.emit(this._content);
        },
        enumerable: true,
        configurable: true
    });
    GoldenLayoutDirective.prototype.updateSize = function (width, height) {
        if (this.instance) {
            this.instance.updateSize(width, height);
        }
    };
    // public getComponent(name: string): void {
    //   if (this.instance) {
    //     this.instance.getComponent(name);
    //   }
    // }
    // public getComponent(name: string): void {
    //   if (this.instance) {
    //     this.instance.getComponent(name);
    //   }
    // }
    GoldenLayoutDirective.prototype.registerComponent = 
    // public getComponent(name: string): void {
    //   if (this.instance) {
    //     this.instance.getComponent(name);
    //   }
    // }
    function (goldenLayoutComponentDefinitions) {
        var _this = this;
        this.instance.registerComponent(goldenLayoutComponentDefinitions.componentName, function (container, componentState) {
            _this.zone.run(function () {
                // Inputs need to be in the following format to be resolved properly
                // let inputProviders = Object.keys(componentState).map((inputName) => {return {provide: inputName, useValue: componentState[inputName]};});
                // inputProviders.push({
                //     provide: GoldenLayoutContainer,
                //     useValue: container
                //   });
                // console.log('inputProviders', inputProviders)
                var injector = _this._createComponentInjector(container, componentState);
                var factory = _this.resolver.resolveComponentFactory(goldenLayoutComponentDefinitions.componentType);
                var componentRef = _this.viewContainer.createComponent(factory, undefined, injector);
                // (componentRef.instance).data = componentState;
                // console.log('componentState', componentState)
                // Bind the new component to container's client DOM element.
                container.getElement().append($(componentRef.location.nativeElement));
                componentRef.changeDetectorRef.detectChanges();
                // this._bindEventHooks(container, componentRef.instance);
                // Store a ref to the componentRef in the container to support destruction later on.
                // this._bindEventHooks(container, componentRef.instance);
                // Store a ref to the componentRef in the container to support destruction later on.
                container[COMPONENT_REF_KEY] = componentRef;
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
    };
    GoldenLayoutDirective.prototype._createComponentInjector = function (container, componentState) {
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
    };
    GoldenLayoutDirective.prototype.ngDoCheck = function () {
        if (!this.disabled && this.configDiff) {
            var changes = this.configDiff.diff(this.config || {});
            if (changes && this.instance) {
                this.ngOnDestroy();
                this.ngOnInit();
            }
        }
    };
    GoldenLayoutDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.instance) {
            this.zone.runOutsideAngular(function () {
                _this.instance.destroy();
            });
            this.instance = null;
        }
    };
    GoldenLayoutDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.instance && changes['disabled']) {
            if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                if (changes['disabled'].currentValue === false) {
                    this.zone.runOutsideAngular(function () {
                        _this.instance.enable();
                    });
                }
                else if (changes['disabled'].currentValue === true) {
                    this.zone.runOutsideAngular(function () {
                        _this.instance.disable();
                    });
                }
            }
        }
    };
    GoldenLayoutDirective.prototype.goldenLayout = function () {
        return this.instance;
    };
    GoldenLayoutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[golden-layout]',
                    exportAs: 'angularGoldenLayout'
                },] },
    ];
    /** @nocollapse */
    GoldenLayoutDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: NgZone, },
        { type: Renderer2, },
        { type: ElementRef, },
        { type: KeyValueDiffers, },
        { type: ViewContainerRef, },
        { type: Injector, },
        { type: GoldenLayoutConfig, decorators: [{ type: Optional }, { type: Inject, args: [GOLDEN_LAYOUT_CONFIG,] },] },
    ]; };
    GoldenLayoutDirective.propDecorators = {
        "el": [{ type: ViewChild, args: ['glroot',] },],
        "disabled": [{ type: Input },],
        "config": [{ type: Input, args: ['golden-layout',] },],
        "contentChange": [{ type: Output },],
        "componentDefinitions": [{ type: Input },],
        "GL_INITIALISED": [{ type: Output, args: ['initialised',] },],
        "GL_STATECHANGED": [{ type: Output, args: ['stateChanged',] },],
        "GL_WINDOWOPENED": [{ type: Output, args: ['windowOpened',] },],
        "GL_WINDOWCLOSED": [{ type: Output, args: ['windowClosed',] },],
        "GL_SELECTIONCHANGED": [{ type: Output, args: ['selectionChanged',] },],
        "GL_ITEMDESTROYED": [{ type: Output, args: ['itemDestroyed',] },],
        "GL_ITEMCREATED": [{ type: Output, args: ['itemCreated',] },],
        "GL_COMPONENTCREATED": [{ type: Output, args: ['componentCreated',] },],
        "GL_ROWCREATED": [{ type: Output, args: ['rowCreated',] },],
        "GL_COLUMNCREATED": [{ type: Output, args: ['columnCreated',] },],
        "GL_STACKCREATED": [{ type: Output, args: ['stackCreated',] },],
        "GL_TABCREATED": [{ type: Output, args: ['tabCreated',] },],
        "content": [{ type: Input },],
    };
    return GoldenLayoutDirective;
}());
export { GoldenLayoutDirective };
//# sourceMappingURL=golden-layout.directive.js.map