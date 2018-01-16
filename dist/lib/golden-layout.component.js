import { Component, Input, ViewChild } from '@angular/core';
import { GoldenLayoutDirective } from './golden-layout.directive';
import { GoldenLayoutConfig } from './golden-layout.interfaces';
var GoldenLayoutComponent = (function () {
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