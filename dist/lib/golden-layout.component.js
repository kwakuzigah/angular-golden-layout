/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild } from "@angular/core";
import { GoldenLayoutDirective } from "./golden-layout.directive";
import { GoldenLayoutConfig } from "./golden-layout.interfaces";
export class GoldenLayoutComponent {
    constructor() {
        this.disabled = false;
        this.useGoldenLayoutClass = true;
    }
}
GoldenLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'golden-layout',
                exportAs: 'angularGoldenLayout',
                template: '<div></div>',
            },] },
];
/** @nocollapse */
GoldenLayoutComponent.ctorParameters = () => [];
GoldenLayoutComponent.propDecorators = {
    "disabled": [{ type: Input },],
    "config": [{ type: Input },],
    "useGoldenLayoutClass": [{ type: Input },],
    "directiveRef": [{ type: ViewChild, args: [GoldenLayoutDirective,] },],
};
function GoldenLayoutComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GoldenLayoutComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GoldenLayoutComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    GoldenLayoutComponent.propDecorators;
    /** @type {?} */
    GoldenLayoutComponent.prototype.disabled;
    /** @type {?} */
    GoldenLayoutComponent.prototype.config;
    /** @type {?} */
    GoldenLayoutComponent.prototype.useGoldenLayoutClass;
    /** @type {?} */
    GoldenLayoutComponent.prototype.directiveRef;
}
//# sourceMappingURL=golden-layout.component.js.map