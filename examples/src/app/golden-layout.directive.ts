import * as GoldenLayout from 'golden-layout';
import { InjectionToken, HostListener, Directive, KeyValueDiffer, Input, Renderer2, KeyValueDiffers, ElementRef, ViewContainerRef, Injector,
 Optional, ViewChild, Inject, SimpleChanges, OnInit, DoCheck, OnChanges, OnDestroy, NgZone, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';

import { GOLDEN_LAYOUT_CONFIG } from './golden-layout.interfaces';

import { GoldenLayoutEvents, GoldenLayoutConfig } from './golden-layout.interfaces';

export const GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
export const GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
const COMPONENT_REF_KEY = '$componentRef';

@Directive({
  selector: '[golden-layout]',
  exportAs: 'angularGoldenLayout'
})
export class GoldenLayoutDirective  implements OnInit, DoCheck, OnChanges, OnDestroy {
  private instance: any;

  private configDiff: KeyValueDiffer<string, any>;

  @ViewChild('glroot') private el: ElementRef;
  @Input() disabled: boolean = false;

  @Input('golden-layout') config: GoldenLayout.Config;

//   @Output('error'                 ) DZ_ERROR                    = new EventEmitter<any>();
//   @Output('success'               ) DZ_SUCCESS                  = new EventEmitter<any>();
//   @Output('sending'               ) DZ_SENDING                  = new EventEmitter<any>();
//   @Output('canceled'              ) DZ_CANCELED                 = new EventEmitter<any>();
//   @Output('complete'              ) DZ_COMPLETE                 = new EventEmitter<any>();
//   @Output('processing'            ) DZ_PROCESSING               = new EventEmitter<any>();

//   @Output('drop'                  ) DZ_DROP                     = new EventEmitter<any>();
//   @Output('dragStart'             ) DZ_DRAGSTART                = new EventEmitter<any>();
//   @Output('dragEnd'               ) DZ_DRAGEND                  = new EventEmitter<any>();
//   @Output('dragEnter'             ) DZ_DRAGENTER                = new EventEmitter<any>();
//   @Output('dragOver'              ) DZ_DRAGOVER                 = new EventEmitter<any>();
//   @Output('dragLeave'             ) DZ_DRAGLEAVE                = new EventEmitter<any>();

//   @Output('thumbnail'             ) DZ_THUMBNAIL                = new EventEmitter<any>();
//   @Output('addedFile'             ) DZ_ADDEDFILE                = new EventEmitter<any>();
//   @Output('removedFile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
//   @Output('uploadProgress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
//   @Output('maxFilesReached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
//   @Output('maxFilesExceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();

//   @Output('successMultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
//   @Output('sendingMultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
//   @Output('canceledMultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();
//   @Output('completeMultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
//   @Output('processingMultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();

//   @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
//   @Output('queueComplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();
//   @Output('totalUploadProgress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();

  constructor(
    private resolver: ComponentFactoryResolver, 
    private zone: NgZone, 
    private renderer: Renderer2,
    private elementRef: ElementRef, 
    private differs: KeyValueDiffers,
    private viewContainer: ViewContainerRef,
    private readonly injector: Injector,
    @Optional() @Inject(GOLDEN_LAYOUT_CONFIG) private defaults: GoldenLayoutConfig)
  {
    const gl = GoldenLayout;
    console.log('>>>> resolver', this.resolver)
  }

  ngOnInit() {
    const params = new GoldenLayoutConfig(this.defaults);

    params.assign(this.config); // Custom configuration
//     this.renderer.addClass(this.elementRef.nativeElement,
//       (params.maxFiles === 1) ? 'dz-single' : 'dz-multiple');

//     this.renderer.removeClass(this.elementRef.nativeElement,
//       (params.maxFiles === 1) ? 'dz-multiple' : 'dz-single');

    this.zone.runOutsideAngular(() => {
      console.log('>>>> init GoldenLayout', params, this.elementRef.nativeElement )
      this.instance = new GoldenLayout(params, this.elementRef.nativeElement);

      this.instance.eventHub.on('itemDestroyed', (item: any) => {
        const container = item.container;
        const component = container && container[COMPONENT_REF_KEY];
        if (component) {
          component.destroy();
          (container as any)[COMPONENT_REF_KEY] = null;
        }
      });
    });

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

  public init() {
    this.zone.runOutsideAngular(() => {
      this.instance.init();
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    if (this.instance) {
      this.instance.updateSize();
    }
  }

  public registerComponent(name: String, componentType: any) {

    this.instance.registerComponent(name, (container: GoldenLayout.Container, componentState: any) => {
       this.zone.run(() => {
        // Inputs need to be in the following format to be resolved properly
        // let inputProviders = Object.keys(componentState).map((inputName) => {return {provide: inputName, useValue: componentState[inputName]};});
        // inputProviders.push({
        //     provide: GoldenLayoutContainer,
        //     useValue: container
        //   });
          // console.log('inputProviders', inputProviders)
        const injector = this._createComponentInjector(container, componentState);
        const factory = this.resolver.resolveComponentFactory(componentType);
        const componentRef = this.viewContainer.createComponent(factory, undefined, injector);
        // (componentRef.instance).data = componentState;
          console.log('componentState', componentState)

        // Bind the new component to container's client DOM element.
        container.getElement().append($(componentRef.location.nativeElement));

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
    });
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


  // public reset(cancel?: boolean) {
//     if (this.instance) {
//       this.zone.runOutsideAngular(() => {
//         this.instance.removeAllFiles(cancel);
//       });
//     }
//   }
}