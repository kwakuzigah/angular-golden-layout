import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldenLayoutComponent } from './golden-layout.component';
import { GoldenLayoutDirective } from './golden-layout.directive';
var GoldenLayoutModule = (function () {
    function GoldenLayoutModule() {
    }
    GoldenLayoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [GoldenLayoutComponent, GoldenLayoutDirective],
                    exports: [CommonModule, GoldenLayoutComponent, GoldenLayoutDirective]
                },] },
    ];
    /** @nocollapse */
    GoldenLayoutModule.ctorParameters = function () { return []; };
    return GoldenLayoutModule;
}());
export { GoldenLayoutModule };
//# sourceMappingURL=golden-layout.module.js.map