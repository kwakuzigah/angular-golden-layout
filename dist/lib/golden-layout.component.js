import { Component, Input, ViewChild } from '@angular/core';
import { GoldenLayoutDirective } from './golden-layout.directive';
import { GoldenLayoutConfig } from './golden-layout.interfaces';
var GoldenLayoutComponent = (function () {
    // @Output('error'                 ) DZ_ERROR                    = new EventEmitter<any>();
    // @Output('success'               ) DZ_SUCCESS                  = new EventEmitter<any>();
    // @Output('sending'               ) DZ_SENDING                  = new EventEmitter<any>();
    // @Output('canceled'              ) DZ_CANCELED                 = new EventEmitter<any>();
    // @Output('complete'              ) DZ_COMPLETE                 = new EventEmitter<any>();
    // @Output('processing'            ) DZ_PROCESSING               = new EventEmitter<any>();
    // @Output('drop'                  ) DZ_DROP                     = new EventEmitter<any>();
    // @Output('dragStart'             ) DZ_DRAGSTART                = new EventEmitter<any>();
    // @Output('dragEnd'               ) DZ_DRAGEND                  = new EventEmitter<any>();
    // @Output('dragEnter'             ) DZ_DRAGENTER                = new EventEmitter<any>();
    // @Output('dragOver'              ) DZ_DRAGOVER                 = new EventEmitter<any>();
    // @Output('dragLeave'             ) DZ_DRAGLEAVE                = new EventEmitter<any>();
    // @Output('thumbnail'             ) DZ_THUMBNAIL                = new EventEmitter<any>();
    // @Output('addedFile'             ) DZ_ADDEDFILE                = new EventEmitter<any>();
    // @Output('removedFile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
    // @Output('uploadProgress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
    // @Output('maxFilesReached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
    // @Output('maxFilesExceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();
    // @Output('successMultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
    // @Output('sendingMultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
    // @Output('canceledMultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();
    // @Output('completeMultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
    // @Output('processingMultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();
    // @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
    // @Output('queueComplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();
    // @Output('totalUploadProgress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();
    function GoldenLayoutComponent() {
        this.disabled = false;
        this.useGoldenLayoutClass = true;
    }
    GoldenLayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'golden-layout',
                    exportAs: 'angularGoldenLayout',
                    template: '<div></div>',
                },] },
    ];
    /** @nocollapse */
    GoldenLayoutComponent.ctorParameters = function () { return []; };
    GoldenLayoutComponent.propDecorators = {
        "disabled": [{ type: Input },],
        "config": [{ type: Input },],
        "useGoldenLayoutClass": [{ type: Input },],
        "directiveRef": [{ type: ViewChild, args: [GoldenLayoutDirective,] },],
    };
    return GoldenLayoutComponent;
}());
export { GoldenLayoutComponent };
//# sourceMappingURL=golden-layout.component.js.map