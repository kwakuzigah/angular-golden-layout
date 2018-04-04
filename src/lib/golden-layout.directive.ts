import * as GoldenLayout from 'golden-layout';
import {
  InjectionToken, HostListener, Directive, KeyValueDiffer, Input, Renderer2, KeyValueDiffers, ElementRef, ViewContainerRef, Injector,
  Optional, ViewChild, Inject, SimpleChanges, OnInit, DoCheck, OnChanges, OnDestroy, NgZone, ReflectiveInjector, ComponentFactoryResolver, EventEmitter, Output
} from '@angular/core';

import { GOLDEN_LAYOUT_CONFIG, GoldenLayoutEvents, GoldenLayoutConfig, GoldenLayoutComponentDefinition, GoldenLayoutComponentConfig, GoldenLayoutItemConfiguration } from './golden-layout.interfaces';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

export const GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
export const GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
const COMPONENT_REF_KEY = '$componentRef';

@Directive({
  selector: '[golden-layout]',
  exportAs: 'angularGoldenLayout'
})
export class GoldenLayoutDirective implements OnInit, AfterViewInit, DoCheck, OnChanges, OnDestroy {
  private instance: any;

  private configDiff: KeyValueDiffer<string, any>;

  @ViewChild('glroot') private el: ElementRef;
  @Input() disabled: boolean = false;

  @Input('golden-layout') config: GoldenLayout.Config;
  private _content: GoldenLayout.ItemConfigType;
  @Output() contentChange = new EventEmitter();
  @Input() componentDefinitions: GoldenLayoutComponentDefinition[];

  @Output('initialised') GL_INITIALISED = new EventEmitter<any>();
  @Output('stateChanged') GL_STATECHANGED = new EventEmitter<any>();
  @Output('windowOpened') GL_WINDOWOPENED = new EventEmitter<any>();
  @Output('windowClosed') GL_WINDOWCLOSED = new EventEmitter<any>();
  @Output('selectionChanged') GL_SELECTIONCHANGED = new EventEmitter<any>();
  @Output('itemDestroyed') GL_ITEMDESTROYED = new EventEmitter<any>();
  @Output('itemCreated') GL_ITEMCREATED = new EventEmitter<any>();
  @Output('componentCreated') GL_COMPONENTCREATED = new EventEmitter<any>();
  @Output('rowCreated') GL_ROWCREATED = new EventEmitter<any>();
  @Output('columnCreated') GL_COLUMNCREATED = new EventEmitter<any>();
  @Output('stackCreated') GL_STACKCREATED = new EventEmitter<any>();
  @Output('tabCreated') GL_TABCREATED = new EventEmitter<any>();

  constructor(
    private resolver: ComponentFactoryResolver,
    private zone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private differs: KeyValueDiffers,
    private viewContainer: ViewContainerRef,
    private readonly injector: Injector,
    @Optional() @Inject(GOLDEN_LAYOUT_CONFIG) private defaults: GoldenLayoutConfig) {
    const gl = GoldenLayout;
  }

  ngOnInit() {
    const params = new GoldenLayoutConfig(this.defaults);

    console.log('config', this.config);
    console.log('content', this.content);
    params.assign(this.config);
    params.assign({ content: this.content });

    // this.zone.runOutsideAngular(() => {
      this.instance = new GoldenLayout(params, this.elementRef.nativeElement);
    // });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create();

      this.configDiff.diff(this.config || {});
    }
  }

  ngAfterViewInit(): void {
    console.log('>>> in after view init')
    //init golden layout
    // this.zone.runOutsideAngular(() => {
      this.componentDefinitions.forEach(componentDefinition => {
        console.log('componentDefinition', componentDefinition)
        this.registerComponent(componentDefinition);
      });

      console.log('>>> init state changed')
      this.instance.on('stateChanged', () => {
        console.log('>>> state changed', this.instance.toConfig())
        this.content = this.instance.toConfig().content;
      });

      //TODO fix destroy
      this.instance.on('itemDestroyed', (item: any) => {
        const container = item.container;
        const component = container && container[COMPONENT_REF_KEY];
        if (component) {
          component.destroy();
          (container as any)[COMPONENT_REF_KEY] = null;
        }
      });

      // Add native Golden Layout event handling
      GoldenLayoutEvents.forEach((eventName) => {
        this.instance.on(eventName.toLowerCase(), (...args) => {
          args = (args.length === 1) ? args[0] : args;

          if (this[`GL_${eventName.toUpperCase()}`]) {
            this.zone.run(() => {
              this[`GL_${eventName.toUpperCase()}`].emit(args);
            });
          }
        });
      });
      this.instance.init();
    // });
  }

  set content(val) {
    this._content = val;
    this.contentChange.emit(this._content);
  }

  @Input()
  get content() {
    return this._content;
  }

  public updateSize(width: number, height: number): void {
    if (this.instance) {
      this.instance.updateSize(width, height);
    }
  }

  // public getComponent(name: string): void {
  //   if (this.instance) {
  //     this.instance.getComponent(name);
  //   }
  // }

  public registerComponent(goldenLayoutComponentDefinitions: GoldenLayoutComponentDefinition) {

    this.instance.registerComponent(goldenLayoutComponentDefinitions.componentName, (container: GoldenLayout.Container, componentState: any) => {
      // Inputs need to be in the following format to be resolved properly
      // let inputProviders = Object.keys(componentState).map((inputName) => {return {provide: inputName, useValue: componentState[inputName]};});
      // inputProviders.push({
      //     provide: GoldenLayoutContainer,
      //     useValue: container
      //   });
      // console.log('inputProviders', inputProviders)
      const injector = this._createComponentInjector(container, componentState);
      const factory = this.resolver.resolveComponentFactory(goldenLayoutComponentDefinitions.componentType);
      const componentRef = this.viewContainer.createComponent(factory, undefined, injector);
      // (componentRef.instance).data = componentState;
      // console.log('componentState', componentState)

      // Bind the new component to container's client DOM element.
      container.getElement().append($(componentRef.location.nativeElement));
      componentRef.changeDetectorRef.detectChanges();

      // this._bindEventHooks(container, componentRef.instance);

      // Store a ref to the componentRef in the container to support destruction later on.
      (container as any)[COMPONENT_REF_KEY] = componentRef;

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
  }

  public createDragSource(element, componentConfiguration: GoldenLayoutItemConfiguration) {
    if (this.instance) {
      this.instance.createDragSource(element, componentConfiguration);
    }
  }

  private _createComponentInjector(container: GoldenLayout.Container, componentState: any): Injector {
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

  ngDoCheck() {
    if (!this.disabled && this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes && this.instance) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.destroy();
      });

      this.instance = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.instance && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === false) {
          this.zone.runOutsideAngular(() => {
            this.instance.enable();
          });
        } else if (changes['disabled'].currentValue === true) {
          this.zone.runOutsideAngular(() => {
            this.instance.disable();
          });
        }
      }
    }
  }

  public goldenLayout(): any {
    return this.instance;
  }
}